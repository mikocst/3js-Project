import * as THREE from "three"
import './styles.css'
import typefaceFont from './static/fonts/Geist Black_Regular.json'
import { FontLoader} from "three/examples/jsm/loaders/FontLoader"
import {TextGeometry} from "three/examples/jsm/geometries/TextGeometry"
import GUI from 'lil-gui'

const debug = new GUI()

const scene = new THREE.Scene()

//setting canvas to window width and height
const canvas = document.querySelector('canvas.webgl')
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
}

//lighting
const light = new THREE.DirectionalLight(0xfffff,1)
light.position.set(0,3,5)
scene.add(light)

//const helper = new THREE.DirectionalLightHelper(light,2)
//scene.add(helper)

//responsiveness for 3D Scene
window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

const renderer = new THREE.WebGLRenderer({
    canvas:canvas,
    antialias: true,
})
renderer.setSize(sizes.width, sizes.height)


//Initializing textures
const textureLoader = new THREE.TextureLoader()
const texture = textureLoader.load('/static/dullblue.jpeg')
const textureshine = textureLoader.load('/static/blueg.jpeg')

//texture refinement
texture.colorSpace = THREE.SRGBColorSpace
texture.generateMipmaps = false
texture.minFilterFilter = THREE.NearestFilter

//texture shine refinement
textureshine.colorSpace = THREE.SRGBColorSpace
texture.generateMipmaps = true


//Initialization of font
const fontLoader = new FontLoader()
fontLoader.load(
    './static/fonts/Geist Black_Regular.json', (font) =>
    {   console.log(font)
        //console.log('font loaded') the font is loaded
        //creating text geometry
        const textGeometry = new TextGeometry(
            'M i k o  n  3 J S',
            {
                font, //property the same as variable so we can write it like this
                size: 0.25,
                depth: 0.4,
                curveSegments: 3,
                bevelEnabled: true,
                bevelThickness: 0.02,
                bevelSize: 0.02,
                bevelOffset: 0,
                bevelSegments: 1,
            }
        )
        textGeometry.center()
        const textMaterial = new THREE.MeshMatcapMaterial({map: texture}) 
        const text = new THREE.Mesh(textGeometry, textMaterial)
        text.position.z = 6
        scene.add(text)
        
        const spheres = []

        const mesh = new THREE.MeshMatcapMaterial({map:textureshine})
        const geom = new THREE.SphereGeometry(1,16)

        //loading in spheres around the text
        for (let i = 0; i < 1000; i++) {
            const sphere = new THREE.Mesh(geom,mesh)

            sphere.position.x = (Math.random() - 0.5) * 20
            sphere.position.y = (Math.random() - 0.5) * 15
            sphere.position.z = (Math.random() - 0.5) * 10

            sphere.rotation.x = (Math.random() * Math.PI)
            sphere.rotation.y = (Math.random() * Math.PI)

            const scale = Math.random()
            sphere.scale.set(scale,scale,scale)
            spheres.push(sphere)

            scene.add(sphere)
}
//callback animation function to animate each of the spheres
anime(spheres)
    }
)



const camera = new THREE.PerspectiveCamera(75, sizes.width/sizes.height)
camera.position.z = 9
scene.add(camera)

//debug
debug.add(camera.position, 'y')
debug.add(camera.position, 'z')

const clock = new THREE.Clock()

function anime(spheres) {
    const tick = () =>
    {
        const elapsedTime = clock.getElapsedTime()
    
        spheres.forEach((sphere) => {
            sphere.rotation.x += 0.01 * Math.random()
            sphere.rotation.y += 0.01 * Math.random()
        })
    
        // Render
        renderer.render(scene, camera)
    
        // Call tick again on the next frame
        window.requestAnimationFrame(tick)
    }
    
    tick()
}

