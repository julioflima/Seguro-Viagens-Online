

var days = 0;
var hours = 0;
var min = 0;

function getDateTimeBeginPromo(){
    var dateTime = new Date();
    
    return dateTime;
}

function getDateTimeEndPromo(begin_date, mn, hr, dy){

    var end_time = begin_date;

    end_time.setDate(end_time.getDate() + dy);
    end_time.setHours(end_time.getHours() + hr);
    end_time.setMinutes(end_time.getMinutes() + mn);
    
    return end_time;
}

function promoSetTimer(mn, hr, dy){
    end = getDateTimeEndPromo(new Date(), mn, hr, dy);
    console.log("Fim da promoção: " + end);

    return end;
}

function addPromo(mn, hr, dy){
    var endPromoDate = promoSetTimer(mn,hr)
}
