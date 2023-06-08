function checkForMissingFields(element, fields) {
  const requiredFields = fields;
  const missingFields = {};

  // eslint-disable-next-line no-restricted-syntax
  for (const field of requiredFields) {
    if (!element[field]) {
      missingFields[field] = true;
    }
  }

  return missingFields;
}

export default checkForMissingFields;
