// Test import of a JavaScript module
// import { example } from '@/js/example'

// Test import of an asset
// import webpackLogo from '@/images/webpack-logo.svg'

// Test import of styles
import '@/styles/index.scss'

// Appending to the DOM
// const logo = document.createElement('img')
// logo.src = webpackLogo

// const heading = document.createElement('h1')
// heading.textContent = example()

// const app = document.querySelector('#root')
// app.append(logo, heading)
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import * as dat from 'dat.gui'
import testVertexShader from './js/shaders/test/vertex.glsl'
import testFragmentShader from './js/shaders/test/fragment.glsl'

import windVertexShader from './js/shaders/test/windVertex.glsl'
import windFragmentShader from './js/shaders/test/windFragment.glsl'

import { cloth, clothFunction } from './js/models/cloth.js'
/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// LIGHT
scene.add(new THREE.AmbientLight(0x666666))

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
// const flagTexture = textureLoader.load('assets/flag-french.jpg')

/**
 * Test mesh
 */
// Geometry
// const geometry = new THREE.PlaneGeometry(1, 1, 32, 32)

// const count = geometry.attributes.position.count
// const randoms = new Float32Array(count)

// for (let i = 0; i < count; i++) {
//   randoms[i] = Math.random()
// }

// geometry.setAttribute('aRandom', new THREE.BufferAttribute(randoms, 1))

// Material
// const material = new THREE.ShaderMaterial({
//   vertexShader: testVertexShader,
//   fragmentShader: testFragmentShader,
//   uniforms: {
//     uFrequency: { value: new THREE.Vector2(10, 5) },
//     uTime: { value: 0 },
//     uColor: { value: new THREE.Color('orange') },
//     uTexture: { value: flagTexture },
//   },
// })

// gui
//   .add(material.uniforms.uFrequency.value, 'x')
//   .min(0)
//   .max(20)
//   .step(0.01)
//   .name('frequencyX')
// gui
//   .add(material.uniforms.uFrequency.value, 'y')
//   .min(0)
//   .max(20)
//   .step(0.01)
//   .name('frequencyY')

// // Mesh
// const mesh = new THREE.Mesh(geometry, material)
// mesh.scale.y = 2 / 3
// scene.add(mesh)

/**
 * Miles Cloth
 */
// const flagMiles = textureLoader.load('assets/miles.jpg')

// cloth material
var clothTexture = textureLoader.load('assets/miles.jpg')
// clothTexture.anisotropy = 16

var clothMaterial = new THREE.MeshPhongMaterial({
  //   alphaTest: 0.5,
  //   ambient: 0xffffff,
  //   color: 0xffffff,
  //   specular: 0x030303,
  //   emissive: 0x111111,
  //   shiness: 10,
  perPixel: true,
  metal: false,
  map: clothTexture,
  //   side: THREE.DoubleSide,
})

// cloth geometry
var clothGeometry = new THREE.ParametricGeometry(
  clothFunction,
  cloth.w,
  cloth.h
)
clothGeometry.dynamic = true
// clothGeometry.computeFaceNormals()

var uniforms = { texture: { type: 't', value: 0, texture: clothTexture } }
var vertexShader = windVertexShader
var fragmentShader = windFragmentShader

// cloth mesh

let object = new THREE.Mesh(clothGeometry, clothMaterial)
object.position.set(0, 0, 0)
object.castShadow = true
object.receiveShadow = true
scene.add(object)

object.customDepthMaterial = new THREE.ShaderMaterial({
  uniforms: uniforms,
  vertexShader: vertexShader,
  fragmentShader: fragmentShader,
})

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}

window.addEventListener('resize', () => {
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

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
)
camera.position.set(0.25, -0.25, 1)
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () => {
  const elapsedTime = clock.getElapsedTime()

  // Update material
  //   material.uniforms.uTime.value = elapsedTime

  // Update controls
  controls.update()

  // Render
  renderer.render(scene, camera)

  // Call tick again on the next frame
  window.requestAnimationFrame(tick)
}

tick()
