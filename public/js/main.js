// ページの読み込みを待つ
window.addEventListener('DOMContentLoaded', init);

function init() {

  // サイズを指定
  const width = 1240;
  const height = 800;

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
  camera.position.set(0, 40, 80); // 見下ろし
  camera.lookAt(new THREE.Vector3(0, 0, 0)); // 原点方向を向く

  // カメラコントローラーを作成
  const controls = new THREE.OrbitControls(camera, canvasElement);
  controls.target.set(0, 3, 0);
  controls.update();

  box = add_cube(scene)
  sphere = add_sphere(scene)
  add_model(scene);
  add_light(scene);

  // 初回実行
  tick();

  // 毎フレーム時に実行されるループイベント
  function tick() {
    // box.rotation.y += 0.01;
    // box.rotation.x += 0.01;
    sphere.rotation.y += 0.01;

    renderer.render(scene, camera); // レンダリング
    requestAnimationFrame(tick);
  }

  function add_cube(scene) {
    // 箱を作成
    const geometry = new THREE.BoxGeometry(10, 10, 10);
    const material = new THREE.MeshNormalMaterial();
    const box = new THREE.Mesh(geometry, material);

    box.position.x = 30;
    box.position.y = 6;
    box.position.z = -10;
    scene.add(box);

    return box
  }

  function add_sphere(scene) {
    // 球体を作成
    const geometry = new THREE.SphereGeometry(10, 10, 10);

    // 画像を読み込む
    const loader = new THREE.TextureLoader();
    const texture = loader.load('./img/earthmap1k.jpg');
    // マテリアルにテクスチャーを設定
    const material = new THREE.MeshStandardMaterial({
      map: texture
    });
    // メッシュを作成
    const sphere = new THREE.Mesh(geometry, material);
    // 3D空間にメッシュを追加
    scene.add(sphere);

    sphere.position.x = -20;
    sphere.position.y = 10;
    sphere.position.z = -10;

    return sphere
  }

  function add_model(scene) {
    const loader = new THREE.ColladaLoader();

    // Colladaファイルのパスを指定
    loader.load('./model/elf/elf.dae', (collada) => {
      // 読み込み後に3D空間に追加
      const model = collada.scene;
      model.position.x = 4;
      model.position.y = 5;
      model.position.z = 1;
      scene.add(model);
    });

    loader.load('./model/box/box.dae', (collada) => {
      // 読み込み後に3D空間に追加
      const model = collada.scene;
      model.position.x = 0
      model.position.y = 0
      scene.add(model);
    });
  }

  function add_light(scene) {
    // 平行光源を作成
    const directionalLight = new THREE.DirectionalLight(0xffffff);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);
    // 環境光を追加
    const ambientLight = new THREE.AmbientLight(0x333333);
    scene.add(ambientLight);
  }
}
