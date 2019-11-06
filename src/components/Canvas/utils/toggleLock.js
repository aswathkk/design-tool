export default function toggleLock(fabric) {
  fabric.Object.prototype.toggleLock = function() {
    this.lockMovementY = !this.lockMovementY;
    this.lockMovementX = !this.lockMovementX;
    this.lockRotation = !this.lockRotation;
    this.lockScalingX = !this.lockScalingX;
    this.lockScalingY = !this.lockScalingY;
    this.lockSkewingX = !this.lockSkewingX;
    this.lockSkewingY = !this.lockSkewingY;
    this.isLocked = !this.isLocked;
  };
}
