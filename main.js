
//hammadde stokları tutuluyor.
let materialStocks = {
    lettuce: 5,
    pickle: 5,
    sauce: 5,
    onion: 5,
    tomato: 5,
    bread: 5,
    potato: 5,
    cola: 5,
    chicken: 5,
    burger: 5,
};

//pisirme dereceleri random olusturuluyor
let degree = Math.floor(Math.random() * 3 + 1);
//yemek menusu random seciliyor
let menu = Math.floor(Math.random() * 2 + 1);

function chooseMenu() {
    if (menu == 1) {
        materialStocks.chicken--;
        console.log("tavuk pisirildi");
    } else if (menu == 2) {
        materialStocks.burger--;
        console.log("kofte pisirildi");
    } else if (menu !== 2 && menu !== 1) {
        console.log("yanlis secim yapildi");
    }
}



async function cookChicken() {
    if (degree == 0) {
        await order(() => {
            console.log("tavuk pisiriliyor");
        }, 3000);
    } else if (degree == 1) {
        await order(() => console.log("az pismis"), 2000);
    } else if (degree == 2) {
        await order(() => console.log("orta-pismis"), 3000);
    } else if (degree == 3) {
        await order(() => console.log("iyi-pismis"), 4000);
    }
}

let order = (work, time) => {
    return new Promise((resolve) => {
        return setTimeout(() => {
            resolve(work());
        }, time);
    });
};

let stockCheck = () => {
    return new Promise((resolve, reject) => {
        if (Object.values(materialStocks).every((e) => e > 0)) {
            setTimeout(() => {
                resolve(console.log("siparis sonrasi stok kontrol"));
            }, 3000);
        } else {
            reject("stok kalmadi :(");
        }
    });
};

async function process() {
    await order(() => {
        console.log("1 yeni siparis alindi.");
    }, 1000);
    await stockCheck();
    await order(chooseMenu, 1000);
    order(() => {
        materialStocks.potato--, console.log("4 patates hazir!");
    }, 5000);
    order(() => {
        materialStocks.cola--, console.log("5 icecek hazir!");
    }, 2000);
    await cookChicken();
    await order(() => {
        materialStocks.bread--, console.log("3 1 burger hazir!");
    }, 2000);
    await order(() => {
        materialStocks.sauce--, console.log("6 soslar hazir.");
    }, 1000);
    order(() => {
        console.log("7 siparis servis edildi!!");
    }, 1000);
}
process();