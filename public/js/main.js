// ページの読み込みを待つ
window.addEventListener('DOMContentLoaded', init);

function init() {

  // サイズを指定
  const width = 960;
  const height = 540;

  // レンダラーを作成
  const canvasElement = document.querySelector('#myCanvas');
  const renderer = new THREE.WebGLRenderer({
    canvas: canvasElement,
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width, height);

  // シーンを作成
  const scene = new THREE.Scene();

  // カメラを作成
  const camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
  camera.position.set(0, 0, 10);

  // カメラコントローラーを作成
  const controls = new THREE.OrbitControls(camera, canvasElement);
  controls.target.set(0, 3, 0);
  controls.update();

  // 平行光源を作成
  const directionalLight = new THREE.DirectionalLight(0xffffff);
  directionalLight.position.set(1, 1, 1);
  scene.add(directionalLight);
  // 環境光を追加
  const ambientLight = new THREE.AmbientLight(0x333333);
  scene.add(ambientLight);

  box = add_cube(scene)
  box.position.x = -400;
  sphere = add_sphere(scene)
  sphere.position.y = 100;

  // Collada形式のモデルデータを読み込む
  const loader = new THREE.ColladaLoader();
  // Colladaファイルのパスを指定
  loader.load('./model/elf/elf.dae', (collada) => {
    // 読み込み後に3D空間に追加
    const model = collada.scene;
    model.position.x = 100;
    scene.add(model);
  });
  // loader.load('./model/box/box.dae', (collada) => {
  //   // 読み込み後に3D空間に追加
  //   const model = collada.scene;
  //   model.position.x = 10
  //   scene.add(model);
  // });

  // 初回実行
  tick();

  // 毎フレーム時に実行されるループイベントです
  function tick() {
    // box.rotation.y += 0.01;
    // box.rotation.x += 0.01;
    // sphere.rotation.y += 0.01;

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
    const geometry = new THREE.SphereGeometry(30, 30, 30);

    // 画像を読み込む
    const loader = new THREE.TextureLoader();
    const texture = loader.load('./img/earthmap1k.jpg');
    // マテリアルにテクスチャーを設定
    const material = new THREE.MeshStandardMaterial({
      map: texture
    });
    // メッシュを作成
    const mesh = new THREE.Mesh(geometry, material);
    // 3D空間にメッシュを追加
    scene.add(mesh);

    return mesh
  }
}
