module.exports = {
  purge: [
    './src/**/*.html',
    './src/**/*.js'
  ],
  theme: {
    extend: {
      colors: {
        'overdue': '#DC2626',
        // 'doToday': '#6D28D9',
        'doToday': '#2563EB',
        'notDoToday': '#4B5563',
        // 'doLater': '#C4B5FD',
        'doLater': '#93C5FD',
        'notDoLater': '#9CA3AF',
        'neverDo': '#D1D5DB',
        'offWhite': '#f8f8ff',
        'darkGray': '#283747'
      }
    }
  }
}
