import * as THREE from "three"
import './styles.css'
import typefaceFont from './static/fonts/Geist Black_Regular.json'
import { FontLoader} from "three/examples/jsm/loaders/FontLoader"
import {TextGeometry} from "three/examples/jsm/geometries/TextGeometry"

const scene = new THREE.Scene()

const canvas = document.querySelector('canvas.webgl')
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
}
const renderer = new THREE.WebGLRenderer({
    canvas:canvas,
    alpha:true
})
renderer.setSize(sizes.width, sizes.height)

const textureLoader = new THREE.TextureLoader()
const texture = textureLoader.load('/static/Granite08large_4K_BaseColor.png')
const textureNormal = textureLoader.load('/static/Granite08large_4K_Normal.png')
texture.colorSpace = THREE.SRGBColorSpace
texture.generateMipmaps = false
texture.minFilterFilter = THREE.NearestFilter

const fontLoader = new FontLoader()
fontLoader.load(
    './static/fonts/Geist Black_Regular.json', (font) =>
    {   console.log(font)
        //console.log('font loaded') the font is loaded
        const textGeometry = new TextGeometry(
            'M i k o s  3 J S  J o u r n e y',
            {
                font, //property the same as variable so we can write it like this
                size: 0.5,
                height: 0.2,
                curveSegments: 6,
                bevelEnabled: true,
                bevelThickness: 0.03,
                bevelSize: 0.02,
                bevelOffset: 0,
                bevelSegments: 2,
            }
        )
        textGeometry.center()
        const textMaterial = new THREE.MeshMatcapMaterial({map: textureNormal}) 
        const text = new THREE.Mesh(textGeometry, textMaterial)
        scene.add(text)
    }
)


const geom = new THREE.SphereGeometry(1,32)
const mesh = new THREE.MeshBasicMaterial({map:texture})
const shape = new THREE.Mesh(geom,mesh)
scene.add(shape)

const camera = new THREE.PerspectiveCamera(75, sizes.width/sizes.height)
camera.position.z = 5
scene.add(camera)

//establish time
const clock = new THREE.Clock()

const animate = () => {
    const elapsedTime = clock.getElapsedTime()

    //Object position 
    //shape.position.x = Math.cos(elapsedTime * Math.PI)
    //shape.position.y = Math.sin(elapsedTime * Math.PI)

    //object rotation
    shape.rotation.x += 0.01
    shape.rotation.y += 0.001 

    window.requestAnimationFrame(animate)

    renderer.render(scene, camera)
}
animate()