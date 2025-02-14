const moment = require("moment/moment");
defineSearchByTitleFilter = (photos, search) => {
    console.log("Search by title in searchHelper class", search);
    if (!search) return photos;
    return photos.filter(photo => {
        //const title = photo.title || "";
        //photo.title && photo.title.toLowerCase().includes(search.toLowerCase()) ;
        return photo.title && photo.title.toLowerCase().includes(search.toLowerCase()) ;
    });
};

defineSearchByDateFilter = (photos, date) => {
    console.log("Search by date in searchHelper class", date);
    console.log("in Search Helper: ", moment(date, "YYYY-MM-DD"));
    if (!date) return photos;

    return photos.filter(photo => {
        //const title = photo.title || "";
        return photos.filter(photo => {
            moment(photo.date, "YYYY-MM-DD").isSame(moment(date, "YYYY-MM-DD"))

        });
    });
};

//if (date) {
//    photos = photos.filter(photo => moment(photo.date).isSame(date, "day"));
//}

//module.exports = { defineSearchByTitleFilter, defineSearchByDateFilter};
module.exports = { defineSearchByTitleFilter};