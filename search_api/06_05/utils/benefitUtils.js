// Returns an array of all benefit names found in a coverage array
function extractAllBenefitsFromCoverage(coverageArray = []) {
  const allBenefits = [];

  for (const coverage of coverageArray) {
    // Benefit might be directly on the object
    if (coverage.benefitName) {
      allBenefits.push(coverage.benefitName);
    }

    // You can expand this as needed
    // if (Array.isArray(coverage.benefits)) {
    //   allBenefits.push(...coverage.benefits.map(b => b.name));
    // }
  }

  return allBenefits;
}

// Check if at least one benefit from user list exists in the extracted benefits
function doesMemberMatchBenefitList(coverage, userBenefitList = []) {
  const extracted = extractAllBenefitsFromCoverage(coverage);
  return userBenefitList.every((benefit) => extracted.includes(benefit));
}

module.exports = {
  extractAllBenefitsFromCoverage,
  doesMemberMatchBenefitList,
};
