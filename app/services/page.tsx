import type { Metadata } from "next";
import { SiteShell } from "@/components/site-shell";

const pageMeta = {
  title: "Our Services - RAFIX Appliance Repair",
  description:
    "Professional appliance repair services. Same-day service, 90-day warranty, licensed technicians.",
} as const;

export function generateMetadata(): Metadata {
  return {
    title: pageMeta.title,
    description: pageMeta.description,
  };
}

export default function ServicesPage() {
  return (
    <SiteShell>
      <section className="services" id="services" style={{ paddingTop: "2rem" }}>
        <div className="container">
          <div className="section-header">
            <span className="label">Our Services</span>
            <h2>Appliances We Repair</h2>
            <p>Expert repairs for all your home and business appliances, backed by our 90-day warranty</p>
          </div>
          <div className="services-category">
            <h3 className="services-category-title">
              <svg
                fill="none"
                height={22}
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                viewBox="0 0 24 24"
                width={22}
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
              Residential
            </h3>
            <div className="services-grid">
              <a className="service-card" href="/services/2">
                <div className="icon-wrapper">
                  <img
                    alt=""
                    className="service-icon"
                    src="/legacy/assets/20260217235424768_e2f99286-ed0b-4bb7-a681-9955bc2734d1.svg"
                  />
                </div>
                <h3>Refrigerator</h3>
                <p>Cooling issues, leaks &amp; compressor repairs</p>
              </a>
              <a className="service-card" href="/services/3">
                <div className="icon-wrapper">
                  <img
                    alt=""
                    className="service-icon"
                    src="/legacy/assets/20260218183711838_2b0e132c-01eb-4d5a-9167-6a28eb05b8ed.svg"
                  />
                </div>
                <h3>Washer</h3>
                <p>Won't spin, drain issues &amp; excessive vibration</p>
              </a>
              <a className="service-card" href="/services/4">
                <div className="icon-wrapper">
                  <img
                    alt=""
                    className="service-icon"
                    src="/legacy/assets/20260220111650311_bd1ad6a3-f10b-40a9-b579-db8b48cc1a94.png"
                  />
                </div>
                <h3>Ice Machine</h3>
                <p>Low ice production, leaks &amp; freezing malfunctions</p>
              </a>
              <a className="service-card" href="/services/5">
                <div className="icon-wrapper">
                  <img
                    alt=""
                    className="service-icon"
                    src="/legacy/assets/20260220112112571_743fa510-8bc4-4e43-bf1d-b77fd7cb7124.svg"
                  />
                </div>
                <h3>Dryer</h3>
                <p>No heat, long drying times &amp; unusual noises</p>
              </a>
              <a className="service-card" href="/services/6">
                <div className="icon-wrapper">
                  <img
                    alt=""
                    className="service-icon"
                    src="/legacy/assets/20260220112239961_9ed80573-d0ff-4960-b932-02e80c6b9ff0.svg"
                  />
                </div>
                <h3>Dishwasher</h3>
                <p>Not cleaning properly, water leaks &amp; drainage problems</p>
              </a>
              <a className="service-card" href="/services/7">
                <div className="icon-wrapper">
                  <img
                    alt=""
                    className="service-icon"
                    src="/legacy/assets/20260220112353698_d8c1e3c4-ff25-49dc-b4ec-8318c91da6ab.svg"
                  />
                </div>
                <h3>Oven</h3>
                <p>Uneven heating, temperature fluctuations &amp; ignition failures</p>
              </a>
              <a className="service-card" href="/services/8">
                <div className="icon-wrapper">
                  <img
                    alt=""
                    className="service-icon"
                    src="/legacy/assets/20260220112440166_6ac4f480-8182-49fa-84f1-a17b2b5a465e.svg"
                  />
                </div>
                <h3>Cooktop</h3>
                <p>Burners not lighting, inconsistent flame &amp; cracked surfaces</p>
              </a>
              <a className="service-card" href="/services/9">
                <div className="icon-wrapper">
                  <img
                    alt=""
                    className="service-icon"
                    src="/legacy/assets/20260220112527026_0ea73a83-9144-47b7-bf0b-30324ed5b36d.svg"
                  />
                </div>
                <h3>Microwave</h3>
                <p>Not heating, sparking &amp; turntable malfunctions</p>
              </a>
              <a className="service-card" href="/services/10">
                <div className="icon-wrapper">
                  <img
                    alt=""
                    className="service-icon"
                    src="/legacy/assets/20260220112634038_e15d7135-1cc2-40d7-9cb6-4df3610b5242.png"
                  />
                </div>
                <h3>Wine Cooler</h3>
                <p>Temperature inconsistencies, compressor noise &amp; condensation buildup</p>
              </a>
              <a className="service-card" href="/services/11">
                <div className="icon-wrapper">
                  <img
                    alt=""
                    className="service-icon"
                    src="/legacy/assets/20260220112732827_57e14d9f-c6de-4834-89f4-6ffee6843183.svg"
                  />
                </div>
                <h3>Freezer</h3>
                <p>Not freezing, frost buildup &amp; unusual noises</p>
              </a>
              <a className="service-card" href="/services/12">
                <div className="icon-wrapper">
                  <img
                    alt=""
                    className="service-icon"
                    src="/legacy/assets/20260220112851535_484a35c5-afeb-409e-831c-e0b7b2b980c6.png"
                  />
                </div>
                <h3>Garbage Disposal</h3>
                <p>Jammed blades, leaks &amp; motor humming without grinding</p>
              </a>
              <a className="service-card" href="/services/13">
                <div className="icon-wrapper">
                  <img
                    alt=""
                    className="service-icon"
                    src="/legacy/assets/20260220113048023_fe8d955f-557c-438e-9c85-4f6136fece33.png"
                  />
                </div>
                <h3>Stove</h3>
                <p>Burners not heating, gas smell &amp; faulty temperature control</p>
              </a>
              <a className="service-card" href="/services/14">
                <div className="icon-wrapper">
                  <img
                    alt=""
                    className="service-icon"
                    src="/legacy/assets/20260220113241155_1f5d686e-b6c7-4040-8968-c26484fade0c.svg"
                  />
                </div>
                <h3>Range</h3>
                <p>Uneven cooking, burner failures &amp; self-clean malfunctions</p>
              </a>
            </div>
          </div>
          <div className="services-category">
            <h3 className="services-category-title">
              <svg
                fill="none"
                height={22}
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                viewBox="0 0 24 24"
                width={22}
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect height={14} rx={2} ry={2} width={20} x={2} y={7} />
                <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
              </svg>
              Commercial
            </h3>
            <div className="services-grid">
              <a className="service-card" href="/services/1">
                <div className="icon-wrapper">
                  <img
                    alt=""
                    className="service-icon"
                    src="/legacy/assets/20260217235329971_dd0384d5-d100-4a1d-9884-3feaa2cebe0f.svg"
                  />
                </div>
                <h3>Refrigerator</h3>
                <p>Inconsistent temperatures, compressor failures &amp; excessive energy consumption</p>
              </a>
              <a className="service-card" href="/services/15">
                <div className="icon-wrapper">
                  <img
                    alt=""
                    className="service-icon"
                    src="/legacy/assets/20260223063515182_234e5652-dc18-46de-9cec-cea284f26c92.svg"
                  />
                </div>
                <h3>Washer</h3>
                <p>Failure to fill, excessive vibration &amp; cycle interruptions</p>
              </a>
              <a className="service-card" href="/services/16">
                <div className="icon-wrapper">
                  <img
                    alt=""
                    className="service-icon"
                    src="/legacy/assets/20260223063837481_66fcf88e-2721-44a6-989c-1ff24ec4d217.png"
                  />
                </div>
                <h3>Ice Machine</h3>
                <p>Slow ice production, machine cycling issues &amp; water line blockages</p>
              </a>
              <a className="service-card" href="/services/17">
                <div className="icon-wrapper">
                  <img
                    alt=""
                    className="service-icon"
                    src="/legacy/assets/20260223064146334_f24c11ea-8173-476e-b3cc-c3a522badb5d.svg"
                  />
                </div>
                <h3>Dryer</h3>
                <p>Extended drying times, overheating &amp; drum not turning</p>
              </a>
              <a className="service-card" href="/services/18">
                <div className="icon-wrapper">
                  <img
                    alt=""
                    className="service-icon"
                    src="/legacy/assets/20260223070143127_36a591cc-b131-4c0f-902b-c00b9314df7a.svg"
                  />
                </div>
                <h3>Dishwasher</h3>
                <p>Poor wash cycles, water temperature failures &amp; drainage clogs</p>
              </a>
              <a className="service-card" href="/services/19">
                <div className="icon-wrapper">
                  <img
                    alt=""
                    className="service-icon"
                    src="/legacy/assets/20260223070734108_b7c045eb-9b20-49a5-9087-1d841ca622c5.svg"
                  />
                </div>
                <h3>Oven</h3>
                <p>Inconsistent baking temperatures, door seal failures &amp; control board errors</p>
              </a>
              <a className="service-card" href="/services/20">
                <div className="icon-wrapper">
                  <img
                    alt=""
                    className="service-icon"
                    src="/legacy/assets/20260223071026936_c5bd7558-6d48-4b4a-972f-f0eae8075a7b.svg"
                  />
                </div>
                <h3>Cooktop</h3>
                <p>Burner malfunctions, ignition delays &amp; surface damage</p>
              </a>
              <a className="service-card" href="/services/21">
                <div className="icon-wrapper">
                  <img
                    alt=""
                    className="service-icon"
                    src="/legacy/assets/20260223071201706_fd5afa83-7a9d-4f61-ad10-9be3f1ebabd9.svg"
                  />
                </div>
                <h3>Microwave</h3>
                <p>No heat output, door latch failures &amp; power inconsistencies</p>
              </a>
              <a className="service-card" href="/services/22">
                <div className="icon-wrapper">
                  <img
                    alt=""
                    className="service-icon"
                    src="/legacy/assets/20260223071339519_967106f4-b28a-477b-881c-3060164d24e7.png"
                  />
                </div>
                <h3>Wine Cooler</h3>
                <p>Uneven zone temperatures, condenser failures &amp; humidity issues</p>
              </a>
              <a className="service-card" href="/services/23">
                <div className="icon-wrapper">
                  <img
                    alt=""
                    className="service-icon"
                    src="/legacy/assets/20260223071822984_ca95f9ce-4853-41aa-99ef-3d6f3779c48b.svg"
                  />
                </div>
                <h3>Freezer</h3>
                <p>Temperature fluctuations, ice buildup &amp; compressor cycling issues</p>
              </a>
              <a className="service-card" href="/services/24">
                <div className="icon-wrapper">
                  <img
                    alt=""
                    className="service-icon"
                    src="/legacy/assets/20260223072153883_e71027bf-ce13-49b7-b171-9343d994582a.svg"
                  />
                </div>
                <h3>Stove</h3>
                <p>Ignition problems, inconsistent flame &amp; burner blockages</p>
              </a>
              <a className="service-card" href="/services/25">
                <div className="icon-wrapper">
                  <img
                    alt=""
                    className="service-icon"
                    src="/legacy/assets/20260223072251245_4194d52a-13c9-460c-8637-b64b5c6232b9.png"
                  />
                </div>
                <h3>Garbage Disposal</h3>
                <p>Frequent jams, slow grinding &amp; motor burnout</p>
              </a>
              <a className="service-card" href="/services/26">
                <div className="icon-wrapper">
                  <img
                    alt=""
                    className="service-icon"
                    src="/legacy/assets/20260223072609109_6ee40a13-973c-4cd2-bd35-5ce04c4c6e42.svg"
                  />
                </div>
                <h3>Vent Hood</h3>
                <p>Poor ventilation, motor failures &amp; grease buildup</p>
              </a>
              <a className="service-card" href="/services/27">
                <div className="icon-wrapper">
                  <img
                    alt=""
                    className="service-icon"
                    src="/legacy/assets/20260223072844119_db47f1ab-4ea1-4d8d-adff-c1e774b83326.svg"
                  />
                </div>
                <h3>Range</h3>
                <p>Pilot light failures, uneven heating &amp; gas line issues</p>
              </a>
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
