"use client";

import { useState } from "react";
import ShowButton from "../ui/button/show-button";
import EmailBox from "./email-box";

export default function EmailInputs({ email }: { email: string }) {
	const [showCC, setShowCC] = useState(false);
	const [showCCO, setShowCCO] = useState(false);

	return (
		<>
			<div className="flex flex-wrap gap-2 mt-10">
				<EmailBox label="Para:" name="to" value={email} required readOnly />
				{!showCC && <ShowButton text="CC" show={setShowCC} close />}
				{!showCCO && <ShowButton text="CCO" show={setShowCCO} close />}
				<div className="flex flex-col w-full gap-2">
					{showCC && (
						<div className="flex flex-wrap gap-2">
							<EmailBox label="CC:" name="cc" />
							<ShowButton show={setShowCC} />
						</div>
					)}
					{showCCO && (
						<div className="flex flex-wrap gap-2">
							<EmailBox label="CCO:" name="cco" />
							<ShowButton show={setShowCCO} />
						</div>
					)}
				</div>
			</div>
		</>
	);
}
