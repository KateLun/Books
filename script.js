let booksNumber = 1

let books = [
    {
        id: booksNumber++,
        title: 'Sapiens. Краткая история человечества',
        authors: 'Юваль Ной Харари',
        year: '2011',
        image: 'https://avatars.mds.yandex.net/get-marketpic/1617999/market_6oJ_25OKOHB8Caas2cFv-Q/orig'
    },
    {
        id: booksNumber++,
        title: 'Homo Deus. Краткая история будущего',
        authors: 'Юваль Ной Харрари',
        year: '2015',
        image: 'https://sindbadbooks.ru/image/cache/data/2020/Homo_deus_KBS_2D_site-700x700.png'
    },
    {
        id: booksNumber++,
        title:'Мартин Иден',
        authors: 'Джек Лондон',
        year: '1909',
        image: 'https://img-gorod.ru/28/335/2833520_detail.jpg'
    },
    {
        id: booksNumber++,
        title:'Таинственный остров',
        authors: 'Жюль Верн',
        year: '1875',
        image:'https://main-cdn.sbermegamarket.ru/big1/hlr-system/1487831414/100024447209b0.jpg'
    },
    {
        id: booksNumber++,
        title:'Путешествие к центру Земли',
        authors: 'Жюль Верн',
        year: '1864',
        image:'https://cdn.eksmo.ru/v2/ITD000000000304677/COVER/cover1__w820.jpg'
    },
    {
        id: booksNumber++,
        title:'«Приключения Шерлока Холмса: Собака Баскервилей»',
        authors: 'Артур Конан Дойл',
        year: '1902',
        image:'https://xn--80aaph2avkn4e.xn--p1ai/wa-data/public/shop/products/45/11/31145/images/72990/72990.745.jpg'
    }
    ]
const container = document.getElementById('container')

const addModal = document.getElementById('add-modal')
const closeModalButton = document.getElementById('close-modal-button')
const openModalButton = document.getElementById('open-modal-button')

function closeModal() {
    addModal.style.display = 'none'
}

function openModal() {
    addModal.style.display = 'flex'
}

closeModalButton.addEventListener('click', closeModal)
openModalButton.addEventListener('click', openModal)

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

function getImage(imageValue) {
    let image
    if (imageValue) {
        image = imageValue
    } else {
        image = 'https://sun4-12.userapi.com/s/v1/if1/ChvOuAKNW6TfJDNiFhVeezp5GBYJLjC9OUpjdnvqA9F3Y79XaQIndolipLz-wOHVAIt_Td4S.jpg?size=200x200&quality=96&crop=126,126,748,748&ava=1'
    }
    return image
}
 
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

    const booksJson = JSON.stringify(books) //сохраняем в LS
    localStorage.setItem('books', booksJson)
}
//function addBook() {
//    const containerBook = document.getElementById('container_addBook')
//    containerBook.style.display = 'flex'
//}


function saveBook() {
    const titleValue = document.getElementById('title').value 
    const authorsValue = document.getElementById('authors').value 
    const yearValue = document.getElementById('year').value 
    const imageValue = document.getElementById('image').value 

    const book = {
        id: booksNumber++,
        title: titleValue,
        authors: authorsValue,
        year: yearValue,
        image: getImage(imageValue)
    }

    books.unshift(book)
    renderBooks()
    clearForms()
    closeModal() 

    const booksJson = JSON.stringify(books)
    localStorage.setItem('books', booksJson)
}

renderBooks()

const saveBookButton = document.getElementById('save-book-button')
saveBookButton.addEventListener('click', saveBook)

const booksJson = localStorage.getItem('books')
//const savedBooks = JSON.parse(booksJson)
if (booksJson) {
    books = JSON.parse(booksJson)
}

renderBooks()