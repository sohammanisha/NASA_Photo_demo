const natural = require('natural');

// Function to filter photos with AI-based search
defineAIPhotoFilter = (photos, searchTerm) => {
    if (!searchTerm) return photos;
    const tokenizer = new natural.WordTokenizer();
    const tokens = tokenizer.tokenize(searchTerm.toLowerCase());

    return photos.filter(photo => {
        const titleTokens = tokenizer.tokenize(photo.title.toLowerCase());
        return tokens.some(token => titleTokens.includes(token));
    });
};

// Function to get statistical analysis of photos
definePhotoStatistics = (photos) => {
    const totalPhotos = photos.length;
    const dateCount = {};
    photos.forEach(photo => {
        const date = photo.date.split('-')[0];
        dateCount[date] = (dateCount[date] || 0) + 1;
    });

    const stats = {
        totalPhotos,
        yearlyDistribution: dateCount
    };
    console.log("Total Photos", stats.totalPhotos);
    console.log("YearlyDistribution", stats.yearlyDistribution);
    return stats;
};

module.exports = { defineAIPhotoFilter, definePhotoStatistics };
