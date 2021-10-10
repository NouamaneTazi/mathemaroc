module.exports = {
  plugins: [
    ["postcss-easy-import", { prefix: "_" }], // keep this first

    [
      "autoprefixer",
      {
        /* ...options */
      },
    ], // so imports are auto-prefixed too
    
  ],
};
