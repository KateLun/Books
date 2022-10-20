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

function saveToLocalStorage() { //сохраняем в LS
    const booksJson = JSON.stringify(books) //переводим объект массива в JSON
    localStorage.setItem('books', booksJson) //передаем данные в хранилище LS
}

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
                    <button id='openModalUpdate-${book.id}' class='button_change button_book button'>Обновить</button>
                </div>
                <div class='button-div'>
                    <button id='deleteBookButton-${book.id}' class='button_delete button_book button'>Удалить</button>
                </div>
            </div>
        </div> `
    });

    books.forEach((book) => {
        document.getElementById(`deleteBookButton-${book.id}`).addEventListener('click', () => {
            deleteBook(book.id); //удаляется та книга, на которую нажал пользователь
        });
    });

    books.forEach((book) => { //проходимся по всему массиву книг и берем id книги, на кнопку которой нажали обновить/изменить
        function makeOpenUpdateModal() {
            openUpdateModal(book.id)
        }
        //короткая запись без функ makeOpen.. - .addEventListener('click', () => OpenUpdateModal(book.id))

        document.getElementById(`openModalUpdate-${book.id}`).addEventListener('click', makeOpenUpdateModal) //вешаем обработчик, передаем не вызов функции, а саму функцию
    });

    saveToLocalStorage()
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
    const bookDel = books.find((b) => {  // находим книгу по id
        return b.id === id
    })
    const bookIndex = books.indexOf(bookDel)  // узнаем индекс книги в массиве,  присваиваем переменной индексы книг из массива
    books.splice(bookIndex, 1) // удаляем 1 элемент из массива
    renderBooks() // перерисовываем список
    saveToLocalStorage() //сохраняем в LS
}

//function addBook() {
//    const containerBook = document.getElementById('container_addBook')
//    containerBook.style.display = 'flex'
//}

const saveBookButton = document.getElementById('save-book-button')
saveBookButton.addEventListener('click', saveBook)

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
    saveToLocalStorage()
}

const updateModal = document.getElementById('update_add-modal')
const closeUpdateModalButton = document.getElementById('close-update-modal-button')
const updateBookButton = document.getElementById('update-book-button')

closeUpdateModalButton.addEventListener('click', closeUpdateModal)

function closeUpdateModal() {
    updateModal.style.display = 'none'
}

function openUpdateModal(id) {
    updateModal.style.display = 'flex'

    const currentBook = books.find(b => b.id === id) //находим(find) книгу: проходимся по массиву и ищем книгу, у которой id = id что мы передали при нажатии

    document.getElementById('updateTitle').value = currentBook.title //находим html элемент и передаем туда значение - данные книги
    document.getElementById('updateAuthors').value = currentBook.authors
    document.getElementById('updateYear').value = currentBook.year
    document.getElementById('updateImage').value = currentBook.image

    //function makeUpdate() {  - равноценно с записью ниже
    //    updateBook(id, makeUpdate)
    //}

    const makeUpdate = () => updateBook(id, makeUpdate)

    updateBookButton.addEventListener('click', makeUpdate)
}

function updateBook(id, makeUpdate) {
    updateBookButton.removeEventListener('click', makeUpdate) // удаляем слушателя обработчика события

    const oldBook = books.find(b => b.id === id)

    const titleValue = document.getElementById('updateTitle').value; //получаем значение из поля "имя"
    const authorsValue = document.getElementById('updateAuthors').value; //получаем значение из поля "автор"
    const yearValue = document.getElementById('updateYear').value; //получаем значение из поля "год"
    const imageValue = document.getElementById('updateImage').value //*

    const newBook= {
        id: oldBook.id,
        title: titleValue,
        authors: authorsValue,
        year: yearValue,
        image: imageValue // image: document.getElementById('updateImage').value - так короче, записи равноценные, промежуточные значения* не нужны
    }

    const bookIndex = books.indexOf(oldBook) // найдем индекс (место, порядковый номер), где стояла наша старая книга
    books.splice(bookIndex, 1, newBook) // (на какое место ставим, кол-во элементов которое удаляем, то что мы ставим на место)

    renderBooks()
    saveToLocalStorage()
    closeUpdateModal()
}


const booksJson = localStorage.getItem('books')
//const savedBooks = JSON.parse(booksJson)
if (booksJson) {
    books = JSON.parse(booksJson)
}
renderBooks()