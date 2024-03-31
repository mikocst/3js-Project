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


const geom = new THREE.SphereGeometry(1,32,16)
const mesh = new THREE.MeshBasicMaterial({map:texture})
const sphere = new THREE.Mesh(geom,mesh)
scene.add(sphere)

const camera = new THREE.PerspectiveCamera(75, sizes.width/sizes.height)
camera.position.z = 5
scene.add(camera)

renderer.render(scene, camera)