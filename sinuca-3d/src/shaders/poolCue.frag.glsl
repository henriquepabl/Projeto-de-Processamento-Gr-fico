uniform float uTime;

varying vec2 vUv;
varying vec3 vNormal;

float random(vec2 st) {
    return fract(sin(dot(st.xy,
        vec2(12.9898,78.233))) *
        43758.5453123);
}

void main() {
    vec3 wood1 = vec3(0.72, 0.52, 0.30);
    vec3 wood2 = vec3(0.45, 0.28, 0.12);

    float grain =
        sin(vUv.y * 120.0 + random(vec2(vUv.y)) * 2.0) * 0.08;

    vec3 color = mix(
        wood1,
        wood2,
        grain + 0.5
    );

    if(vUv.y < 0.18){
        color = vec3(0.08, 0.08, 0.08);
    }

    if(vUv.y > 0.96){
        color = vec3(0.85, 0.85, 0.82);
    }

    float light = dot(normalize(vNormal), normalize(vec3(0.3,1.0,0.5)));

    light = light * 0.5 + 0.5;

    color *= light;

    float shine = pow(max(dot(vNormal, normalize(vec3(0.2,1.0,0.3))), 0.0), 18.0);

    color += shine * 0.15;

    gl_FragColor = vec4(color, 1.0);
}