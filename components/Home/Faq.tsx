"use client";

import { useState } from "react";
import { useSiteData } from "@/components/SiteDataContext";

type FaqItem = {
	question: string;
	answer: string;
};

function Faq() {
	const [openIndex, setOpenIndex] = useState<number>(0);
	const { faq } = useSiteData();
	const items = faq as FaqItem[];

	return (
		<section className="faq" id="faq">
			<div className="container">
				<div className="section-header">
					<span className="label">FAQ</span>
					<h2>Frequently Asked Questions</h2>
					<p>Quick answers about our appliance repair process, pricing, and service coverage.</p>
				</div>

				<div className="faq-list" role="list">
					{items.map((item, index) => {
						const isOpen = openIndex === index;

						return (
							<article className={`faq-item${isOpen ? " open" : ""}`} key={item.question} role="listitem">
								<button
									aria-expanded={isOpen}
									aria-controls={`faq-answer-${index}`}
									className="faq-question"
									onClick={() => setOpenIndex(isOpen ? -1 : index)}
									type="button"
								>
									<span>{item.question}</span>
									<span aria-hidden="true" className="faq-icon">
										<svg
											fill="none"
											height={20}
											stroke="currentColor"
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											viewBox="0 0 24 24"
											width={20}
											xmlns="http://www.w3.org/2000/svg"
										>
											<line x1="12" x2="12" y1="5" y2="19" />
											<line x1="5" x2="19" y1="12" y2="12" />
										</svg>
									</span>
								</button>

								<div className="faq-answer-wrap" id={`faq-answer-${index}`}>
									<p className="faq-answer">{item.answer}</p>
								</div>
							</article>
						);
					})}
				</div>
			</div>

			<style jsx>{`
				.faq {
					padding: 6rem 0;
					background: linear-gradient(180deg, #f9fbfd 0%, #ffffff 100%);
				}

				.faq-list {
					max-width: 960px;
					margin: 2rem auto 0;
					display: grid;
					gap: 0.875rem;
				}

				.faq-item {
					border: 1px solid rgba(26, 58, 102, 0.12);
					border-radius: 14px;
					background: #fff;
					box-shadow: 0 8px 28px rgba(17, 24, 39, 0.06);
					overflow: hidden;
					transition: border-color 0.25s ease, box-shadow 0.25s ease;
				}

				.faq-item.open {
					border-color: rgba(43, 90, 155, 0.35);
					box-shadow: 0 12px 30px rgba(43, 90, 155, 0.14);
				}

				.faq-question {
					width: 100%;
					border: 0;
					background: transparent;
					color: #1f2937;
					display: flex;
					align-items: center;
					justify-content: space-between;
					gap: 1rem;
					text-align: left;
					padding: 1.15rem 1.25rem;
					font-size: 1rem;
					font-weight: 700;
					line-height: 1.4;
				}

				.faq-icon {
					display: inline-flex;
					align-items: center;
					justify-content: center;
					color: #2b5a9b;
					transition: transform 0.25s ease;
					flex-shrink: 0;
				}

				.faq-item.open .faq-icon {
					transform: rotate(45deg);
				}

				.faq-answer-wrap {
					max-height: 0;
					overflow: hidden;
					transition: max-height 0.3s ease;
				}

				.faq-item.open .faq-answer-wrap {
					max-height: 180px;
				}

				.faq-answer {
					margin: 0;
					padding: 0 1.25rem 1.15rem;
					color: #4b5563;
					line-height: 1.65;
					font-size: 0.98rem;
				}

				@media (max-width: 767px) {
					.faq {
						padding: 4.5rem 0;
					}

					.faq-question {
						font-size: 0.95rem;
						padding: 1rem 1rem;
					}

					.faq-answer {
						padding: 0 1rem 1rem;
						font-size: 0.92rem;
					}

					.faq-item.open .faq-answer-wrap {
						max-height: 240px;
					}
				}
			`}</style>
		</section>
	);
}

export default Faq;
