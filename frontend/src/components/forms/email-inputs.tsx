"use client";

import { useState } from "react";
import ShowButton from "../ui/button/show-button";
import EmailBox from "./email-box";

type Props = {
	to?: string;
	cc?: string;
	cco?: string;
};

export default function EmailInputs({ to, cc = "", cco = "" }: Props) {
	const [showCC, setShowCC] = useState<boolean>(cc !== "");
	const [showCCO, setShowCCO] = useState<boolean>(cco !== "");

	return (
		<>
			<div className="flex flex-wrap gap-2">
				<EmailBox label="Para:" name="to" value={to} required readOnly />
				{!showCC && <ShowButton text="CC" show={setShowCC} close />}
				{!showCCO && <ShowButton text="CCO" show={setShowCCO} close />}
				<div className="flex flex-col w-full gap-2">
					{showCC && (
						<div className="flex flex-wrap gap-2">
							<EmailBox label="CC:" name="cc" value={cc} />
							<ShowButton show={setShowCC} />
						</div>
					)}
					{showCCO && (
						<div className="flex flex-wrap gap-2">
							<EmailBox label="CCO:" name="cco" value={cco} />
							<ShowButton show={setShowCCO} />
						</div>
					)}
				</div>
			</div>
		</>
	);
}
