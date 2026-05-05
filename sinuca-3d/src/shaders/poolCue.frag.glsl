precision mediump float;

uniform float uTime;

varying vec2 vUv;
varying vec3 vNormalView;
varying vec3 vViewPosition;

float wave(float x, float t) {
  return 0.5 + 0.5 * sin(x * 20.0 + t);
}

void main() {
  float along = vUv.y;

  float w = wave(along, uTime * 2.0);

  float pulse = 0.5 + 0.5 * sin(uTime * 3.0);
  pulse = mix(0.7, 1.0, pulse);

  vec3 woodDark = vec3(0.22, 0.1, 0.05);
  vec3 woodLight = vec3(0.55, 0.32, 0.14);
  vec3 accent = vec3(0.12, 0.42, 0.95);

  vec3 base = mix(woodDark, woodLight, w);
  base = mix(base, accent, w * 0.3 * pulse);

  vec3 viewDir = normalize(vViewPosition + vec3(0.0001));

  float rim = pow(1.0 - max(dot(normalize(vNormalView), viewDir), 0.0), 2.5);
  base += vec3(0.35, 0.65, 1.0) * rim * (0.4 * pulse);

  float spec = pow(max(dot(normalize(vNormalView), viewDir), 0.0), 16.0);
  base += vec3(1.0) * spec * 0.15;

  gl_FragColor = vec4(base * pulse, 1.0);
}