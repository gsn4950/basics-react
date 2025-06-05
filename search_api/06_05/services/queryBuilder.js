function buildQuery(criteria = {}) {
  const query = {};
  const andConditions = [];

  if (criteria.isDualEligible !== undefined) {
    query["member.isDualEligible"] = criteria.isDualEligible;
  }

  if (criteria.veteranStatus !== undefined) {
    query["member.isVeteran"] = criteria.veteranStatus;
  }

  if (criteria.isCurrentCovWithBenefit) {
    andConditions.push({
      coverage: {
        $elemMatch: {
          period: "current",
          benefitName: criteria.isCurrentCovWithBenefit,
        },
      },
    });
  }

  if (criteria.isCov) {
    andConditions.push({
      "coverage.0": { $exists: true },
    });
  }

  if (andConditions.length > 0) {
    if (Object.keys(query).length > 0) {
      query["$and"] = [...andConditions];
    } else {
      Object.assign(query, { $and: andConditions });
    }
  }

  return query;
}

module.exports = { buildQuery };
