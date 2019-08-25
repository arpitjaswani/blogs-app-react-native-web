module.exports = {
    getDate : _ => {
        var d = new Date();
        dformat = [d.getMonth()+1,
            d.getDate(),
            d.getFullYear()].join('/')+' '+
           [d.getHours(),
            d.getMinutes(),
            d.getSeconds()].join(':');
        return dformat;
    }
}