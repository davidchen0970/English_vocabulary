function getRandom(x) {
    return Math.floor(Math.random() * x);
};

function fetchExcel() {
    var url = './senior_7000.xls'; // 替换为实际的文件网址

    fetch(url)
        .then(function (response) {
            return response.arrayBuffer();
        })
        .then(function (data) {
            var workbook = XLSX.read(data, { type: 'array' });

            workbook.SheetNames.forEach(function (sheetName) {
                var worksheet = workbook.Sheets[sheetName];
                var jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
                // alert(jsonData);
                // 将工作表内容存储到 localStorage 中，每个项目后追加零
                localStorage.setItem(sheetName, JSON.stringify(jsonData.map(item => [item, 5])));
            });

            console.log('Excel 文件已讀取並儲存到 localStorage 中。');
        })
        .catch(function (error) {
            console.log('发生错误：', error);
        });
};

function changeColor(colorCode){
    var result = document.getElementById('result');
    if(colorCode == 0) result.style.backgroundColor = "#d11d1d";
    if(colorCode == 1) result.style.backgroundColor = "#f5de12";
    if(colorCode == 2) result.style.backgroundColor = "#4CAF50";
    if(colorCode == 4) result.style.backgroundColor = "white";
    if(colorCode == 5) result.style.backgroundColor = "gray";
}

function getItem() {
    // 檢查瀏覽器是否支援 LocalStorage
    if (typeof (Storage) !== "undefined") {
        // 讀取 LocalStorage 中的指定 key
        var level = ["1級", "2級", "3級", "4級", "5級", "6級"];
        var randomNum = getRandom(6);
        var value = localStorage.getItem(level[randomNum]);

        if (value !== null) {
            // 將字串轉換為陣列
            var arrayValue = JSON.parse(value);
            var randomNum = getRandom(arrayValue.length);
            var vocabulary = arrayValue[randomNum][0][0].split('@');

            document.getElementById("result").innerHTML = vocabulary[0];
            document.getElementById("chinese_vacu").innerHTML = vocabulary[1];
            changeColor(arrayValue[randomNum][1]);

            return randomNum;

        } else {
            document.getElementById("result").innerHTML = "找不到指定的值，請再試一次";
            changeColor(4);
            fetchExcel();
        }

    } else {
        document.getElementById("result").innerHTML = "抱歉，你的瀏覽器不支援 LocalStorage";
        changeColor(4);
    }
};