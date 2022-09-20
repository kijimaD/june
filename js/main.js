// ページの読み込みを待つ
window.addEventListener('DOMContentLoaded', init);

function init() {

  // サイズを指定
  const width = 960;
  const height = 540;

  // レンダラーを作成
  const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#myCanvas')
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width, height);

  // シーンを作成
  const scene = new THREE.Scene();

  // カメラを作成
  const camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
  camera.position.set(0, 0, +1000);

  box = add_cube(scene)
  sphere = add_sphere(scene)

  // 初回実行
  tick();
  box.position.x = -400;

  // 毎フレーム時に実行されるループイベントです
  function tick() {
    box.rotation.y += 0.01;
    box.rotation.x += 0.01;
    sphere.position.x += 1;
    sphere.rotation.y += 0.01;
    renderer.render(scene, camera); // レンダリング

    requestAnimationFrame(tick);
  }

  function add_cube(scene) {
    // 箱を作成
    const geometry = new THREE.BoxGeometry(40, 40, 40);
    const material = new THREE.MeshNormalMaterial();
    const box = new THREE.Mesh(geometry, material);
    scene.add(box);

    return box
  }

  function add_sphere(scene) {
    // 球体を作成
    const geometry = new THREE.SphereGeometry(300, 100, 100);

    // 画像を読み込む
    const loader = new THREE.TextureLoader();
    const texture = loader.load('img/earthmap1k.jpg');
    // マテリアルにテクスチャーを設定
    const material = new THREE.MeshStandardMaterial({
      map: texture
    });
    // メッシュを作成
    const mesh = new THREE.Mesh(geometry, material);
    // 3D空間にメッシュを追加
    scene.add(mesh);

    // 平行光源
    const directionalLight = new THREE.DirectionalLight(0xFFFFFF);
    directionalLight.position.set(100, 1, 1);
    // シーンに追加
    scene.add(directionalLight);
    return mesh
  }
}