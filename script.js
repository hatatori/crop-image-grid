const information_properties = document.getElementById('information_properties')

const range_distance_left = document.getElementById('range_distance_left')
const range_distance_top = document.getElementById('range_distance_top')
const range_distance_x = document.getElementById('range_distance_x')
const range_distance_y = document.getElementById('range_distance_y')
const range_picture_width = document.getElementById('range_picture_width')
const range_picture_height = document.getElementById('range_picture_height')
const range_translate_x = document.getElementById('range_translate_x')
const range_translate_y = document.getElementById('range_translate_y')
const range_scale = document.getElementById('range_scale')

const input_name_file = document.getElementById('input_name_file')

const tagFotos = document.getElementById('tagFotos')
const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

let propertiesPicture = {
    distance_left: -7,
    distance_top: 8,
    distance_x: -17,
    distance_y: 17,
    picture_width: 100,
    picture_height: 100,
    translate_x: 0,
    translate_y: 0,
    scale: 1,
    url: '',
    rows: 4,
    columns: 4,
}

function addImage(url) {
    // url = './imgs/coffee.jpg'

    const img = new Image()
    img.src = url

    propertiesPicture.url = url
    // propertiesPicture.picture_height = 200
    img.onload = () => {

        ctx.clearRect(0, 0, img.width, img.height)

        // img.width *= propertiesPicture.scale
        canvas.width = img.width
        canvas.height = img.height
        // propertiesPicture.picture_width = img.width / propertiesPicture.rows
        // propertiesPicture.picture_height = img.height / propertiesPicture.columns
        // refreshRanges()
        const width = img.width * propertiesPicture.scale
        const height = img.height * propertiesPicture.scale

        ctx.drawImage(img, 0, 0, width, height);
        render(propertiesPicture)
        // refreshRanges()
    }

    // canvas.style.height = '100px'
}

// addImage('./imgs/coffee.jpg')
// addImage('./imgs/heels.jpg')

function example1() {
    propertiesPicture.distance_left = -10;
    propertiesPicture.distance_top = 8;
    propertiesPicture.distance_x = -17;
    propertiesPicture.distance_y = 16;
    propertiesPicture.picture_width = 240;
    propertiesPicture.picture_height = 240;
    propertiesPicture.translate_x = 5;
    propertiesPicture.translate_y = 5;
    propertiesPicture.scale = 1;
    propertiesPicture.rows = 4;
    propertiesPicture.columns = 4;
    addImage('./imgs/coffee.jpg')
    setTimeout(() => { render(propertiesPicture) }, 300)
    refreshRanges()
}

function example2() {
    propertiesPicture.distance_left = -10;
    propertiesPicture.distance_top = 8;
    propertiesPicture.distance_x = -17;
    propertiesPicture.distance_y = 24;
    propertiesPicture.picture_width = 403;
    propertiesPicture.picture_height = 384;
    propertiesPicture.translate_x = 5;
    propertiesPicture.translate_y = 5;
    propertiesPicture.scale = 1;
    propertiesPicture.rows = 3;
    propertiesPicture.columns = 3;

    addImage('./imgs/cakes.png')
    setTimeout(() => { render(propertiesPicture) }, 300)
    refreshRanges()
}

example1()

function cropCreate(x, y, w, h) {
    const pic = ctx.getImageData(x, y, w, h);
    const canvas2 = document.createElement('canvas');
    canvas2.width = w;
    canvas2.height = h;
    const ctx2 = canvas2.getContext('2d');
    ctx2.putImageData(pic, 0, 0);
    // tagFotos.appendChild(canvas2);
    canvasToPicture(canvas2)
}

function canvasToPicture(canvas) {
    // const imagemData = canvas.toDataURL('image/png');
    const imagemData = canvas.toDataURL('image/jpeg', 1.0);
    const link = document.createElement('a');
    const img = new Image()
    // img.width = propertiesPicture.scale * img.width
    // img.width = img.width 
    // img.width *= propertiesPicture.scale
    // img.width *= propertiesPicture.scale 
    img.src = imagemData
    img.classList.add('borda')
    link.href = imagemData;
    link.download = 'teste.png';
    linksToDownload.push(link)
    tagFotos.appendChild(img);
}

function downloadAllImages() {

    linksToDownload.splice(0, linksToDownload.length)

    render(propertiesPicture)

    linksToDownload.map((e, i) => {
        // e.downloads = `nome${i}.png`

        const new_name = input_name_file.value

        new_name.replace(/%(\d+)d/g, (a, b) => {

            const num = (a.match(/\d+/g) | 0).toString()

            const num2 = (i + 1).toString().padStart(num, '0')

            const new_name_2 = new_name.replace(/%(\d+)d/g, num2)

            e.setAttribute('download', new_name_2)
            // e.downloads = new_name_2
            e.click()

        })

        // e.setAttribute('download', `nome_${i}.png`)
        // e.downloads = `nome${i}.png`
        // e.click()
    })
}

const linksToDownload = []

function render(propertiesPicture) {

    tagFotos.innerHTML = ''

    const distance_left = -propertiesPicture.distance_left
    const distance_top = propertiesPicture.distance_top
    const distance_x = -propertiesPicture.distance_x
    const distance_y = propertiesPicture.distance_y
    const translate_x = -propertiesPicture.translate_x
    const translate_y = propertiesPicture.translate_y
    const width = propertiesPicture.picture_width
    const height = propertiesPicture.picture_height
    const scale = propertiesPicture.scale
    
    const rows = propertiesPicture.rows
    const columns = propertiesPicture.columns

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            cropCreate(
                j * width + distance_left + distance_x * j + translate_x, // x 
                i * height + distance_top + distance_y * i + translate_y, // y 
                // i * 250 + distance_y, // y
                // 0, // y
                width, //w
                height //h
            )
        }
        const br = document.createElement('br')
        tagFotos.appendChild(br)
    }
    // refreshInformations()
}

// setTimeout(() => { render(propertiesPicture) }, 100);

function informationsReset() {

    propertiesPicture.distance_left = Number(range_distance_left.value)
    propertiesPicture.distance_top = Number(range_distance_top.value)
    propertiesPicture.distance_x = Number(range_distance_x.value)
    propertiesPicture.distance_y = Number(range_distance_y.value)
    propertiesPicture.translate_x = Number(range_translate_x.value)
    propertiesPicture.translate_y = Number(range_translate_y.value)
    propertiesPicture.picture_width = Number(range_picture_width.value)
    propertiesPicture.picture_height = Number(range_picture_height.value)
    propertiesPicture.scale = Number(range_scale.value)

    refreshInformations()

    // propertiesPicture = {
    //     distance_left: Number(range_distance_left.value),
    //     distance_top: Number(range_distance_top.value),
    //     distance_x: Number(range_distance_x.value),
    //     distance_y: Number(range_distance_y.value),
    //     translate_x: Number(range_translate_x.value),
    //     translate_y: Number(range_translate_y.value),
    //     picture_width: Number(range_picture_width.value),
    //     picture_height: Number(range_picture_height.value),
    //     scale: Number(range_scale.value),
    // }

    render(propertiesPicture)

}

function refreshInformations() {
    information_properties.innerText = JSON.stringify(propertiesPicture, null, 2)
}

function refreshRanges() {

    range_distance_left.value = propertiesPicture.distance_left
    range_distance_top.value = propertiesPicture.distance_top
    range_distance_x.value = propertiesPicture.distance_x
    range_distance_y.value = propertiesPicture.distance_y
    range_picture_width.value = propertiesPicture.picture_width
    range_picture_height.value = propertiesPicture.picture_height
    range_translate_x.value = propertiesPicture.translate_x
    range_translate_y.value = propertiesPicture.translate_y
    range_scale.value = propertiesPicture.scale

}


function loadImage() {
    input_file.click()
}

const input_file = document.getElementById('input_file')
input_file.addEventListener("change", e => {

    tagFotos.innerHTML = ''

    const file = input_file.files[0]
    const url = URL.createObjectURL(file)

    propertiesPicture.url = url

    // linksToDownload.splice(0, 1)
    linksToDownload.splice(0, linksToDownload.length)


    setTimeout(() => {
        addImage(propertiesPicture.url)
        // render(propertiesPicture)
        // render(propertiesPicture)
        //     render(propertiesPicture)
    }, 200)


})

function refreshScale() {
    propertiesPicture.scale = Number(range_scale.value)
    addImage(propertiesPicture.url)
    render(propertiesPicture)
}

// range_distance_left.addEventListener('mousemove', e => render())
// range_distance_top.addEventListener('mousemove', e => render())
// range_distance_x.addEventListener('mousemove', e => render())
// range_distance_y.addEventListener('mousemove', e => render())
// range_picture_width.addEventListener('mousemove', e => render())
// range_picture_height.addEventListener('mousemove', e => render())

range_distance_left.addEventListener('change', e => { informationsReset(); })
range_distance_top.addEventListener('change', e => { informationsReset(); })
range_distance_x.addEventListener('change', e => { informationsReset(); })
range_distance_y.addEventListener('change', e => { informationsReset(); })
range_picture_width.addEventListener('change', e => { informationsReset(); })
range_picture_height.addEventListener('change', e => { informationsReset(); })
range_translate_x.addEventListener('change', e => { informationsReset(); })
range_translate_y.addEventListener('change', e => { informationsReset(); })

range_scale.addEventListener('change', e => { refreshScale(); })


