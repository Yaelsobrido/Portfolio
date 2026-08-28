/**
 * Outline of Madagascar, ready for the WebGL scene.
 *
 * Derived from a public simplified GeoJSON of the country border, projected
 * equirectangularly with a cos(latitude) correction so the island is not
 * stretched, then centred on the origin and scaled to 2 units tall
 * (1.01 units wide). Counter-clockwise, no repeated closing vertex.
 *
 * Regenerate rather than hand-editing: the point-in-polygon sampling in
 * NetworkField assumes a single closed ring.
 */
export const MADAGASCAR_OUTLINE: ReadonlyArray<readonly [number, number]> = [
	[0.3739, 0.9367],
	[0.4109, 0.8739],
	[0.4455, 0.7765],
	[0.4679, 0.5991],
	[0.5041, 0.5301],
	[0.4902, 0.4594],
	[0.4655, 0.416],
	[0.4181, 0.5024],
	[0.3919, 0.4588],
	[0.4185, 0.3495],
	[0.4061, 0.287],
	[0.3676, 0.2529],
	[0.3588, 0.128],
	[0.3038, -0.0439],
	[0.235, -0.2472],
	[0.1487, -0.5266],
	[0.0953, -0.7317],
	[0.0322, -0.9027],
	[-0.0814, -0.9376],
	[-0.2032, -1],
	[-0.2836, -0.9623],
	[-0.3945, -0.9096],
	[-0.433, -0.8318],
	[-0.4422, -0.701],
	[-0.4913, -0.5834],
	[-0.5041, -0.4773],
	[-0.4791, -0.371],
	[-0.4148, -0.3455],
	[-0.4145, -0.2964],
	[-0.3477, -0.1846],
	[-0.3352, -0.0906],
	[-0.3676, -0.0208],
	[-0.394, 0.0722],
	[-0.4052, 0.2081],
	[-0.3564, 0.2906],
	[-0.3377, 0.3842],
	[-0.2681, 0.3896],
	[-0.1902, 0.4198],
	[-0.1385, 0.4465],
	[-0.0772, 0.4485],
	[0.0023, 0.5325],
	[0.1172, 0.6234],
	[0.1591, 0.6976],
	[0.1401, 0.7606],
	[0.1994, 0.7429],
	[0.2764, 0.8453],
	[0.2789, 0.934],
	[0.3252, 1],
];

/** Width of the outline in the same units, for framing the camera. */
export const MADAGASCAR_WIDTH = 1.0082;
