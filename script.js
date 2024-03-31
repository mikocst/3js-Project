import * as THREE from "three"
import './styles.css'

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