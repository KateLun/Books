const books = [
    {
        id: 1,
        title: 'Sapiens. Краткая история человечества',
        authors: 'Юваль Ной Харари',
        year: '2011',
        image: 'https://avatars.mds.yandex.net/get-marketpic/1617999/market_6oJ_25OKOHB8Caas2cFv-Q/orig'
    },
    {
        id: 2,
        title: 'Homo Deus. Краткая история будущего',
        authors: 'Юваль Ной Харрари',
        year: '2015',
        image: 'https://sindbadbooks.ru/image/cache/data/2020/Homo_deus_KBS_2D_site-700x700.png'
    },
    {
        id: 3,
        title:'Мартин Иден',
        authors: 'Джек Лондон',
        year: '1909',
        image: 'https://img-gorod.ru/28/335/2833520_detail.jpg'
    },
    {
        id: 4,
        title:'Таинственный остров',
        authors: 'Жюль Верн',
        year: '1875',
        image:'https://main-cdn.sbermegamarket.ru/big1/hlr-system/1487831414/100024447209b0.jpg'
    },
    {
        id: 5,
        title:'Путешествие к центру Земли',
        authors: 'Жюль Верн',
        year: '1864',
        image:'https://cdn.eksmo.ru/v2/ITD000000000304677/COVER/cover1__w820.jpg'
    },
    {
        id: 6,
        title:'«Приключения Шерлока Холмса: Собака Баскервилей»',
        authors: 'Артур Конан Дойл',
        year: '1902',
        image:'https://xn--80aaph2avkn4e.xn--p1ai/wa-data/public/shop/products/45/11/31145/images/72990/72990.745.jpg'
    }
    ]
const container = document.getElementById('container')

function renderBooks() {
    container.innerHTML = ''
    books.forEach((book) => {
        container.innerHTML +=
        `<div class='flex'>
            <div class='book_info'>
                <div class='info_first'>
                    <img class='book-img' src='${book.image}' />
                    <p class='text text_title'>${book.title}<p>
                    <p class='text text_year'>${book.year}</p>
                </div>
                <div>
                    <p class='text text_autors'>${book.authors}</p>
                </div>
            </div>
            <div class='button-flex'>
                <div class='button-div'>
                    <button class='button_change button_book button'>Изменить</button>
                </div>
                <div class='button-div'>
                    <button class='button_delete button_book button' onclick='deleteBook(${book.id})'>Удалить</button>
                </div>
            </div>
        </div> `
    })
}

//function Image(imageValue) { ДОДЕЛАТЬ ПОТОМ
//    if (imageValue) {
//    image = imageValue
//    } else {
//    image.src = 'https://rus-traktor.ru/upload/iblock/f74/f74f39dbc9b60954c926d72401adf1cc.jpg'
//    }
//}

function clearForms() {
    document.getElementById('title').value = ''
    document.getElementById('authors').value = ''
    document.getElementById('year').value = ''
    document.getElementById('image').value = ''
}

function deleteBook(id) {
    const book = books.find((b) => {  // находим книгу
        return b.id === id
    })
    const bookIndex = books.indexOf(book)  // узнаем индекс книги в массиве
    books.splice(bookIndex, 1) // удаляем элемент из массива
    renderBooks() // перерисовываем список
}
function addBook() {
    const containerBook = document.getElementById('container_addBook')
    containerBook.style.display = 'flex'
}

function saveBook() {
    const titleValue = document.getElementById('title').value 
    const authorsValue = document.getElementById('authors').value 
    const yearValue = document.getElementById('year').value 
    const imageValue = document.getElementById('image').value 

    const book = {
        title: titleValue,
        authors: authorsValue,
        year: yearValue,
        image: imageValue
    }

    books.unshift(book)
    renderBooks()
    clearForms()
    
    const containerBook = document.getElementById('container_addBook')
    containerBook.style.display = 'none'
}

renderBooks()