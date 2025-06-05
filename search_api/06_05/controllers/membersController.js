const Member = require("../models/member");
const { buildQuery } = require("../services/queryBuilder");
const { doesMemberMatchBenefitList } = require("../utils/benefitUtils");

const getMembers = async (req, res) => {
  const { limit = 10, page = 1, ...rawCriteria } = req.query;
  const parsedLimit = parseInt(limit, 10);
  const skip = (parseInt(page, 10) - 1) * parsedLimit;

  // Parse booleans and known filters
  const criteria = {
    ...(rawCriteria.isDualEligible !== undefined && {
      isDualEligible: rawCriteria.isDualEligible === "true",
    }),
    ...(rawCriteria.veteranStatus !== undefined && {
      veteranStatus: rawCriteria.veteranStatus === "true",
    }),
    ...(rawCriteria.isCov !== undefined && {
      isCov: rawCriteria.isCov === "true",
    }),
    ...(rawCriteria.isCurrentCovWithBenefit && {
      isCurrentCovWithBenefit: rawCriteria.isCurrentCovWithBenefit,
    }),
    ...(rawCriteria.benefitList && {
      benefitList: Array.isArray(rawCriteria.benefitList)
        ? rawCriteria.benefitList
        : rawCriteria.benefitList.split(","),
    }),
  };

  try {
    const query = buildQuery(criteria);
    const mongoResults = await Member.find(query).lean(); // get full objects

    // Apply benefit filtering manually in Node.js
    const filtered = criteria.benefitList
      ? mongoResults.filter((doc) =>
          doesMemberMatchBenefitList(doc.coverage, criteria.benefitList)
        )
      : mongoResults;

    const paginated = filtered.slice(skip, skip + parsedLimit);

    const data = paginated.map((doc) => ({
      hid: doc.member?.hid,
      pid: doc.member?.pid,
      genKey: doc.member?.genKey,
    }));

    res.json({ data, count: filtered.length });
  } catch (err) {
    console.error("Error fetching members:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { getMembers };
