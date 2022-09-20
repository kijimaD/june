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
  renderer.shadowMap.enabled = true;

  // シーンを作成
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xFFFFFF);

  // カメラを作成
  const camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
  camera.position.set(0, 40, 80); // 見下ろし
  camera.lookAt(new THREE.Vector3(0, 0, 0)); // 原点方向を向く

  // カメラコントローラーを作成
  const controls = new THREE.OrbitControls(camera, canvasElement);
  controls.target.set(0, 3, 0);
  controls.update();

  box = add_floor(scene)
  sphere = add_sphere(scene)
  add_model(scene);
  add_book(scene)
  add_light(scene);
  add_cube(scene);

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

  function add_floor(scene) {
    // 箱を作成
    const geometry = new THREE.PlaneGeometry(200, 200);

    const loader = new THREE.TextureLoader();
    const texture = loader.load('./img/floor.jpg');
    const material = new THREE.MeshStandardMaterial({
      map: texture
    });

    const floor = new THREE.Mesh(geometry, material);

    floor.position.x = 0;
    floor.position.y = 0;
    floor.position.z = -10;
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true
    scene.add(floor);

    return floor
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
    sphere.receiveShadow = true;
    sphere.castShadow = true;

    return sphere
  }

  function add_model(scene) {
    const loader = new THREE.ColladaLoader();

    // Colladaファイルのパスを指定
    loader.load('./model/elf/elf.dae', (collada) => {
      // 読み込み後に3D空間に追加
      const model = collada.scene;
      model.position.x = 8;
      model.position.y = 1;
      model.position.z = 8;
      scene.add(model);
    });
  }

  function add_book(scene) {
    const loader = new THREE.ColladaLoader();

    // Colladaファイルのパスを指定
    loader.load('./model/book/book.dae', (collada) => {
      // 読み込み後に3D空間に追加
      const model = collada.scene;
      model.position.x = 4;
      model.position.y = 1;
      model.position.z = 8;
      scene.add(model);
    });

    loader.load('./model/book/book.dae', (collada) => {
      // 読み込み後に3D空間に追加
      const model = collada.scene;
      model.position.x = 2;
      model.position.y = 1;
      model.position.z = 8;
      scene.add(model);
    });

    loader.load('./model/book/book.dae', (collada) => {
      // 読み込み後に3D空間に追加
      const model = collada.scene;
      model.position.x = 0;
      model.position.y = 1;
      model.position.z = 8;
      scene.add(model);
    });
  }

  function add_cube(scene) {
    const loader = new THREE.TextureLoader();
    const texture = loader.load('./img/wood.jpg');
    const material = new THREE.MeshStandardMaterial({
      map: texture
    });
    const geometry = new THREE.BoxGeometry(4, 4, 4);

    let boxes = []
    for (let i = 0; i < 300; i++) {
      const box = new THREE.Mesh(geometry, material);
      box.position.x = Math.round((Math.random()) * 20) * 4 - 40;
      box.position.y = 2;
      box.position.z = Math.round((Math.random()) * 20) * 4 - 40;

      boxes.some(function(element) {
        while (element[0] == box.position.x && element[1] == box.position.y && element[2] == box.position.z) {
          box.position.y += 4;
        }
      })

      // 影の設定
      box.receiveShadow = true;
      box.castShadow = true;

      scene.add(box);
      boxes.push([box.position.x, box.position.y, box.position.z])
    }
  }

  function add_light(scene) {
    // 環境光を追加
    const ambientLight = new THREE.AmbientLight(0x333333);
    scene.add(ambientLight);

    {
      const spotLight = new THREE.SpotLight(0xffffff, 4, 200, Math.PI / 5, 0.2, 1.5);
      spotLight.position.set(80, 30, 80);
      spotLight.castShadow = true; // 影を落とす設定
      spotLight.shadow.mapSize.width = 2048;
      spotLight.shadow.mapSize.height = 2048;
      scene.add(spotLight);
    }

  }
}
