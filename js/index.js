// 1) Написать функцию, преобразующую число в объект.
// Передавая на вход число от 0 до 999, мы должны получить на выходе объект,
// в котором в соответствующих свойствах описаны единицы, десятки и сотни.
// Например, для числа 245 мы должны получить следующий объект: {‘единицы’: 5, ‘десятки’: 4, ‘сотни’: 2}.
// Если число превышает 999, необходимо выдать соответствующее сообщение с помощью console.log и вернуть пустой объект.


let number = Math.floor(Math.random() * 1000); // - [0, 1000) => от 0 до 999

function transformNumToObj(num) {

    console.log('Входное число:', num);

    let maxValue = 999;
    let object = {};

    if (num < 0) {

        console.log('Ваше число меньше 0, а должно быть в пределах [0, 1000). Объекта не будет :)');
        console.log('----------------------------------');

    } else if (num > maxValue) {

        console.log('Ваше число больше 999, а должно быть в пределах [0, 1000). Полученный объект пуст:');
        object = {};
        console.log(object);
        console.log('----------------------------------');
        return object;

    } else {

        let numArr = num.toString().split(''); // разбиваем число на массив

        // 1Й ВАРИАНТ решения
        if (numArr.length === 3) {
            object['единицы'] = numArr[2];
            object['десятки'] = numArr[1];
            object['сотни'] = numArr[0]
        } else if (numArr.length === 2) {
            object['единицы'] = numArr[1];
            object['десятки'] = numArr[0]
        } else {
            object['единицы'] = numArr[0]
        }

        // 2Й ВАРИАНТ решения - с использованием циклов (здесь, наверное, выше сложность)
        // if(numArr.length === 3){
        //     for (let i = 0; i < numArr.length; i++){
        //         if(i === 0){
        //             object['сотни'] = numArr[0];
        //         }else if(i === 1){
        //             object['десятки'] = numArr[1];
        //         } else{
        //             object['единицы'] = numArr[2];
        //         }
        //     }
        // }else if(numArr.length === 2) {
        //     for (let i = 0; i < numArr.length; i++) {
        //         if(i === 0){
        //             object['десятки'] = numArr[0];
        //         }else{
        //             object['единицы'] = numArr[1];
        //         }
        //     }
        // }else{
        //     object['единицы'] = numArr[0]
        // }

        console.log('Полученный объект:', object);
        console.log('----------------------------------');
        return object;

    }
}

transformNumToObj(10003);
transformNumToObj(number);
transformNumToObj(0);
transformNumToObj(12);
transformNumToObj(7);
transformNumToObj(-200);


//--------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------
// 2) Продолжаем работу с нашим интернет-магазином
// 2.1. В прошлом ДЗ Вы реализовали корзину на базе массивов. Какими объектами можно заменить элементы данных массивов?

// Например:
// let cartItem = {
//     name: '',
//     description: '',
//     cost: ''
// };

// 2.2. Реализуйте такие объекты
// 2.3. Перенесите функционал подсчета корзины на объектно-ориентированную базу
// * Подготовить макет страницы интернет-магазина по подобию приложенной к уроку картинки.
// * Подумайте над глобальными сущностями. К примеру, сущность “Продукт” в интернет-магазине актуальна не только для
// корзины, но и для каталога. Стремиться нужно к тому, чтобы объект “Продукт” имел единую структуру для различных
// модулей нашего сайта, но в разных местах давал возможность вызывать разные методы.

let cart = [];

$(document).ready(function () {

    // ----- фильтрация табов start
    let currClass = "";

    $(".catalog-nav-btn").click(function () {

        currClass = $(this).attr("data-rel");

        $(".catalog-items .catalog-item").not("." + currClass).fadeOut().css('display: none;');

        setTimeout(function () {
            $("." + currClass).fadeIn().css('display: block;');
        }, 300);

    });
    // ----- фильтрация табов end


    //-----------------------------------------------------------------------------------------------------------
    $(".catalog-item-btn_to-cart").on("click", function () {

        // получаем значения текущего товара
        let costVal = parseInt($(this).parent().parent().children('.catalog-item-cost').text());
        let descVal = $(this).parent().parent().children('.catalog-item-about').text();
        let nameVal = $(this).parent().parent().children('.catalog-item-name').text();

        // записываем их в объект
        let cartItem = {
            name: nameVal,
            description: descVal,
            cost: costVal
        };

        // добавляем объект в корзину
        addToCart(cartItem, cart);
        console.log(cart);

        // считаем итоговую цену
        let totalPrice = countCartPrice(cart);

        // меняем значения в <div class="shopping-cart">
        $("#shopping-cart-count").empty().append(cart.length);
        $("#shopping-cart-price").empty().append(totalPrice);
    });

});


function addToCart(obj, cart) {
    cart.push(obj);
}

function countCartPrice(arr) {
    let totalPrice = 0;
    for (let i = 0; i < arr.length; i++) {
        totalPrice += arr[i].cost;
    }
    console.log('Итого:', totalPrice);
    return totalPrice;
}