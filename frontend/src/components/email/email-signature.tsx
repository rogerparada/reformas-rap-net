import Image from "next/image";

export default function EmailSignature() {
	return (
		<>
			<hr style={{ margin: "20px 0" }} />
			<table style={{ fontFamily: "Arial, sans-serif", fontSize: "10pt", lineHeight: "14pt", borderCollapse: "collapse" }}>
				<tbody>
					<tr>
						<td style={{ paddingRight: "15px", verticalAlign: "top" }}>
							<Image src="/images/Logo.png" alt="Logo Empresa" width="150" height="150" style={{ display: "block", border: 0 }} />
						</td>
						<td style={{ borderLeft: "2px solid #006630", paddingLeft: "15px" }}>
							<p style={{ margin: 0 }}>
								<span style={{ fontSize: "12pt", fontWeight: "bold", color: "#333333" }}>José Parada</span>
							</p>
							<p style={{ margin: "8px 0 8px 0" }}>
								<span style={{ fontSize: "12pt", fontWeight: "bold", color: "black" }}>REFORMAS RAP</span>
								<br />
								<span style={{ color: "#0088cc" }}>Reformas Integrales.</span>
							</p>
							<p style={{ margin: 0 }}>
								<span style={{ color: "#0088cc", fontWeight: "bold" }}>Móvil:</span>
								<a href="tel:627798621" style={{ color: "#666666", textDecoration: "none" }}>
									627798621
								</a>
								<br />
								<span style={{ color: "#0088cc", fontWeight: "bold" }}>Email:</span>
								<a href="mailto:jose@reformasrap.com" style={{ color: "#666666", textDecoration: "none" }}>
									jose@reformasrap.com
								</a>
								<br />
								<span style={{ color: "#0088cc", fontWeight: "bold" }}>Web:</span>
								<a href="reformasrap.com" target="_blank" style={{ color: "#666666", textDecoration: "none" }}>
									reformasrap.com
								</a>
							</p>
						</td>
					</tr>
				</tbody>
			</table>
		</>
	);
}
