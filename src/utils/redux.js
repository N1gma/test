export const withSuffixMod = suffix => str => str + '_' + suffix;

export const withSuffixModSucess = withSuffixMod('SUCCESS')
export const withSuffixModFail = withSuffixMod('FAIL')