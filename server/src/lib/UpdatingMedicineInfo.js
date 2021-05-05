const axios = require('axios');

exports.updateMedicineInfo = async() => {
    console.log('starting')
    
    const itemArray = await getItemsList(getQueryURL);
    await exportJsonData(itemArray);

    console.log('data is saved');
}

//queryUrl을 return하는 함수 : 한 페이지에 100개의 item씩 요청할 수 있다.
const getQueryURL = (i) => {
    const url = "http://apis.data.go.kr/1471000/DrbEasyDrugInfoService/getDrbEasyDrugList";
    const queryParams = '?' + encodeURIComponent('ServiceKey') + '=' + process.env.SERVICE_KEY;
    const pageNum = '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent(i);
    const numOfItem = '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent(100);
    const output = '&' + encodeURIComponent('type') + '=' + encodeURIComponent('json');

    return url + queryParams + pageNum + numOfItem + output;
}

//모든 page의 item을 list에 push해서 return하는 함수
const getItemsList = async(queryUrl) => {
    let i = 1, getItem = null, items = null;
    const result = new Array();
    
    while(true) {
        getItem = await axios.get(queryUrl(i));
        items = getItem.data.body.items;

        if(items === undefined) 
            return result;
        
        result.push(...items);
        console.log('medicine data getting processing... : page', i, 'done');
        i++;
    }
}

//itemArray에 있는 모든 data를 json으로 만들어서 json파일로 저장
const exportJsonData = async(itemList) => {
    itemList.forEach(item => {

    })
}