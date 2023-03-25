module.exports = {
  rules: {
    //general
    indentation: 2, //indentation - spaces-2
    'max-empty-lines': 1, // max. consecutive empty lines
    'max-nesting-depth': 2, // max depth of css nesting
    'no-eol-whitespace': true, // no end-of-line whitespace
    'number-leading-zero': 'always', // Require a leading zero for fractional numbers less than 1. (eg: 0.4, 0.6 ..)
    'property-case': 'lower', // properties must be lowercase (eg: "width", not "WIdth")

    // block
    'block-no-empty': true, //empty blocks not allowed
    'block-opening-brace-space-before': 'always', // always requires a single space before opening brace
    'block-closing-brace-newline-after': 'always', // always requires a newline after the closing brace

    //color
    'color-hex-case': 'lower', // hex colors must be in lowercase
    'color-no-invalid-hex': true, // Disallow invalid hex colors.
    'color-function-notation': 'legacy',

    //units
    'unit-no-unknown': true, // unknown units disallowed

    //declarations
    'declaration-no-important': true, // `!important` not allowed
    'declaration-block-no-duplicate-properties': [
      true,
      {
        ignore: ['consecutive-duplicates-with-different-values'],
      },
    ], // no duplicate properties allowed, except the consecutive ones with different values
  },
  overrides: [
    {
      files: '**/*.scss',
      customSyntax: 'postcss-scss',
    },
  ],
  extends: ['stylelint-config-recommended-scss'],
  defaultSeverity: 'error',
};
