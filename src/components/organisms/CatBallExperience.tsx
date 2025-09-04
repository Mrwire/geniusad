// THREE.js required
var Colors = {
  red:0x129346,
  white:0xd8d0d1,
  pink:0xF5986E,
  lightbrown:0x59332e,
  brown:0x23190f,
  yellow:0xfff68f,
  wheatgold:0xFDE154,
  blackish:0x13110E,
  black:0x000000,
};

var modifier = new THREE.SubdivisionModifier(2);

function Cat(){
this.threeGroup = new THREE.Group();

var bodyMat = new THREE.MeshLambertMaterial({ color: Colors.brown });
var faceMat = new THREE.MeshLambertMaterial({ color: Colors.blackish });

this.bodyHeight = 80;

// Body
var torsoGeom = new THREE.CylinderGeometry(0, 26, this.bodyHeight, 3, 1);
torsoGeom.applyMatrix(new THREE.Matrix4().makeRotationY(Math.PI / 3));
torsoGeom.applyMatrix(new THREE.Matrix4().makeTranslation(0, -this.bodyHeight / 2, 0));
this.torso = new THREE.Mesh(torsoGeom, bodyMat);

this.body = new THREE.Group();
this.body.add(this.torso);
this.body.position.y = this.bodyHeight;

// Head
var faceGeom = new THREE.SphereGeometry(21, 6, 8);
faceGeom.applyMatrix(new THREE.Matrix4().makeTranslation(0,15,0));
faceGeom.applyMatrix(new THREE.Matrix4().makeRotationY(Math.PI / 6));
this.face = new THREE.Mesh(faceGeom, faceMat);

this.head = new THREE.Group();
this.head.add(this.face);

this.head.position.set(0, this.bodyHeight - 15, -5);

// Tail
this.tail = new THREE.Group();
var tailSegGeom = new THREE.CylinderGeometry(5, 4, 8, 6);
tailSegGeom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 4, 0));

this.tailSegments = [];
var tailMat = bodyMat;

for (var i = 0; i < 8; i++){
  var seg = new THREE.Mesh(tailSegGeom.clone(), tailMat);
  seg.position.y = i * 6;
  seg.rotation.x = i === 0 ? -Math.PI / 2 : 0;
  this.tailSegments.push(seg);
  if (i > 0) this.tailSegments[i - 1].add(seg);
}

this.tail.add(this.tailSegments[0]);
this.tail.position.set(0, 5, -36);

this.threeGroup.add(this.body);
this.threeGroup.add(this.head);
this.threeGroup.add(this.tail);

this.threeGroup.traverse(function (object){
  if (object instanceof THREE.Mesh){
    object.castShadow = true;
    object.receiveShadow = true;
  }
});
}

// Animation methods
Cat.prototype.updateTail = function(t){
for (var i = 0; i < this.tailSegments.length; i++){
  var angleStep = -i * 0.5;
  var angleAmp = Math.PI / (30 / (i + 1));
  this.tailSegments[i].rotation.z = Math.sin(t + angleStep) * angleAmp;
}
}

Cat.prototype.lookAt = function(v){
this.head.lookAt(v);
}

Cat.prototype.blink = function(){
TweenMax.to(this.face.scale, 0.1, {y:0.1, repeat:1, yoyo:true});
}

// Initialize Cat
function createCat(scene){
var cat = new Cat();
scene.add(cat.threeGroup);
return cat;
}

// Animation Loop
function animateCat(cat, targetPosition, time){
cat.updateTail(time);
cat.lookAt(targetPosition);

if (Math.random() > 0.995) cat.blink();
}

// Export if using modules
// export { createCat, animateCat };
