const storage = {
    get : () => JSON.parse(localStorage.getItem('petsPost')),
    set : ( value ) => localStorage.setItem( 'petsPost', JSON.stringify( value ))
}

function createPost( petData ){

    const date = new Date()
    const day = date.getDay()
    const month = date.getMonth() + 1
    const year = date.getFullYear()

    const hour = date.getHours()
    const minutes = date.getMinutes()
    
    petData.date = `${day}/${month}/${year} as ${hour}:${minutes}`
    petData.id = crypto.randomUUID()

    return petData
}

function savePost( post ){

    const list = storage.get() || []

    list.push( post )

    storage.set( list  )

    console.log( JSON.parse( localStorage.getItem('petsPost')) )
}

function registerPet(){
    const list = [
        {id: 'title', required: true},
        {id: 'author', required: true},
        {id: 'description'},
        {id: 'img', required: true},
        {id: 'type', required: true},
    ]

    let itemsLeft = []

    const petObj = {}

    for(let i = 0; i < list.length; i++){
        const item = list[ i ]
    
        const {id, required} = item
    
        const value = document.getElementById(id).value
        
        if(!value && required) {
            itemsLeft.push( id )
            continue
        }

        petObj[ id ] = value
    }

        
    if( !itemsLeft.length ){
        
        const post = createPost( petObj )
        savePost( post )

        document.getElementById('form').reset()
    }


}

document.getElementById('form').addEventListener('submit', e => {
    e.preventDefault()
    registerPet()
})