export type ApplianceContent = {
  label: string;
  lower: string;
  intro: string;
  problems: string[];
  checks: string[];
  commercialIntro: string;
  commercialProblems: string[];
  repairOrReplace: string;
};

export const APPLIANCE_CONTENT: Record<string, ApplianceContent> = {
  refrigerator: {
    label: "Refrigerator",
    lower: "refrigerator",
    intro:
      "A refrigerator that stops cooling can put a week of groceries at risk within hours. We diagnose the sealed system, airflow, controls and ice and water components so you know what failed and what the repair involves before any work starts.",
    problems: [
      "Warm fresh food section while the freezer stays cold, often from a failed evaporator fan or a defrost problem",
      "Frost building up on the back wall of the freezer",
      "Water pooling under the unit or inside the crisper drawers from a clogged defrost drain",
      "Loud buzzing, clicking or rattling from the compressor or fan motors",
      "Compressor running constantly or short cycling",
      "Ice maker or water dispenser that has stopped working",
    ],
    checks: [
      "Confirm the temperature setting was not changed and the door closes against a clean gasket",
      "Vacuum the condenser coils if they are accessible and covered in dust",
      "Move food away from the interior vents so cold air can circulate",
    ],
    commercialIntro:
      "When a commercial refrigerator drifts out of temperature, food safety and inventory are both on the line. We work on reach-in units, display coolers and other refrigeration used by restaurants, stores and offices.",
    commercialProblems: [
      "Cabinet temperature climbing during busy periods with frequent door openings",
      "Dirty or blocked condensers in hot kitchen environments",
      "Worn door gaskets and hinges letting cold air escape",
    ],
    repairOrReplace:
      "Fan motors, sensors, thermostats and defrost parts are usually worth repairing. A failed compressor or sealed system leak on an older unit deserves a closer cost comparison, and we will explain the numbers first.",
  },
  washer: {
    label: "Washer",
    lower: "washer",
    intro:
      "A washer that will not drain, spin or finish a cycle quickly leaves you with a tub of wet clothes. We repair top-load and front-load machines and trace the fault through the pump, lid or door lock, drive system and controls.",
    problems: [
      "Water left in the drum at the end of a cycle",
      "No spin, or a slow spin that leaves clothes soaking wet",
      "Heavy shaking, walking or banging during the spin cycle",
      "Leaks from the door boot, hoses or pump",
      "Door or lid that will not lock or unlock",
      "Error codes and cycles that stop partway through",
    ],
    checks: [
      "Clean the drain pump filter on front-load models if your manual shows one",
      "Check that the drain hose is not kinked and the load is balanced",
      "Confirm that both water valves are fully open",
    ],
    commercialIntro:
      "Commercial and heavy-use washers run far more cycles than household machines. We help laundromats, multi-family properties and businesses reduce downtime on machines that have to keep running.",
    commercialProblems: [
      "Drain failures from lint and debris under constant use",
      "Worn bearings and suspension components causing vibration",
      "Door lock and control faults that take a machine out of service",
    ],
    repairOrReplace:
      "Pumps, lid switches, door locks and belts are usually affordable fixes. Failed tub bearings can be labor intensive, so we compare that cost against the age and condition of the machine.",
  },
  "ice-machine": {
    label: "Ice Machine",
    lower: "ice machine",
    intro:
      "Low ice production usually traces back to water supply, a dirty condenser, a scale problem or a failing component. We inspect the whole system so you are not guessing at parts.",
    problems: [
      "Producing noticeably less ice than normal",
      "Thin, cloudy or small cubes",
      "Machine runs but does not harvest ice",
      "Water leaks around the unit or the bin",
      "Unusual noises during the freeze or harvest cycle",
      "Bad taste or odor in the ice",
    ],
    checks: [
      "Confirm that the water supply valve is open and the filter is not overdue",
      "Clear space around the unit so the condenser can move air",
      "Make sure the bin control or shutoff arm is not stuck",
    ],
    commercialIntro:
      "A restaurant, bar or hotel can go through a lot of ice in a single shift, so a slow machine becomes a business problem fast. We diagnose commercial ice machines used in busy locations.",
    commercialProblems: [
      "Scale buildup restricting water flow and harvest",
      "Condensers clogged by grease and kitchen dust",
      "Water inlet and pump problems that reduce production",
    ],
    repairOrReplace:
      "Cleaning, water valves, pumps and sensors are commonly repairable. A compressor failure on an older machine calls for a cost comparison before you decide.",
  },
  dryer: {
    label: "Dryer",
    lower: "dryer",
    intro:
      "A dryer that takes two or three cycles wastes energy and can be a sign of restricted airflow. We repair gas and electric dryers and check heating, airflow, belts and controls together.",
    problems: [
      "Runs but produces little or no heat",
      "Clothes are still damp after a full cycle",
      "Will not start, or stops partway through a cycle",
      "Squealing, thumping or grinding from the drum",
      "Burning smell or a cabinet that runs unusually hot",
      "Drum that does not turn because of a broken belt",
    ],
    checks: [
      "Clean the lint screen and the housing underneath it",
      "Check that the vent hose is not crushed behind the dryer",
      "Go outside during a cycle and confirm that air is flowing from the wall vent",
    ],
    commercialIntro:
      "Commercial dryers in laundromats, salons, gyms and multi-family buildings see constant use, and lint builds up quickly. We help keep heavy-use machines drying efficiently and safely.",
    commercialProblems: [
      "Long dry times from restricted exhaust",
      "Worn belts, rollers and bearings",
      "Ignition and heating faults on gas units",
    ],
    repairOrReplace:
      "Heating elements, igniters, belts, rollers and thermal fuses are usually good repairs. If you smell gas, leave the area and call your gas utility first, then schedule service.",
  },
  dishwasher: {
    label: "Dishwasher",
    lower: "dishwasher",
    intro:
      "Dirty dishes, standing water and leaks usually come from a small set of causes. We check the spray system, pump, drain, inlet valve and controls to find the actual fault.",
    problems: [
      "Dishes come out dirty, cloudy or gritty",
      "Standing water in the bottom after the cycle",
      "Water leaking onto the kitchen floor",
      "Dishes are not drying",
      "Cycle will not start, or stops midway",
      "Grinding or humming noises during the wash",
    ],
    checks: [
      "Clean the filter at the bottom of the tub",
      "Clear the spray arm holes and confirm that the arms spin freely",
      "Run the kitchen tap until hot before starting a cycle",
    ],
    commercialIntro:
      "A commercial dishwasher is central to kitchen flow, and a breakdown can back up the whole line. We diagnose wash, rinse, drain and temperature problems on units used in commercial kitchens.",
    commercialProblems: [
      "Wash or rinse temperatures that fall below target",
      "Clogged spray arms and heavy scale",
      "Drain and pump failures during high-volume service",
    ],
    repairOrReplace:
      "Pumps, inlet valves, door latches and seals are often worthwhile repairs. A failed control board on an older model is the main case where comparing replacement makes sense.",
  },
  oven: {
    label: "Oven",
    lower: "oven",
    intro:
      "An oven that will not heat or cooks unevenly makes every meal harder. We repair gas and electric ovens, including elements, igniters, sensors, door components and control faults.",
    problems: [
      "Oven will not heat or takes far too long to preheat",
      "Food burns on one side and stays underdone on the other",
      "Temperature does not match the setting",
      "Gas oven clicks or will not light",
      "Door will not close properly or the seal is damaged",
      "Display errors or a control panel that does not respond",
    ],
    checks: [
      "Use a separate oven thermometer to measure the actual temperature",
      "Avoid covering racks with foil, which blocks airflow",
      "Check for visible breaks or blisters on electric bake elements with the power off",
    ],
    commercialIntro:
      "Commercial ovens need to hold temperature through long, busy shifts. We diagnose ignition, thermostat, element and door problems on ovens used by restaurants and other food businesses.",
    commercialProblems: [
      "Hot spots and inconsistent results during service",
      "Ignition or pilot problems on gas models",
      "Door hinges and seals worn from constant use",
    ],
    repairOrReplace:
      "Elements, igniters and temperature sensors are usually straightforward repairs. If you smell gas, do not use the oven: leave the area and contact your gas utility.",
  },
  cooktop: {
    label: "Cooktop",
    lower: "cooktop",
    intro:
      "From a burner that will not light to an induction zone that shows an error, we troubleshoot gas, electric and induction cooktops and explain the repair before starting.",
    problems: [
      "Gas burner that clicks but will not ignite",
      "Weak, uneven or yellow flame",
      "Electric element that stays off or stays on high",
      "Induction zone that does not recognize a pan",
      "Control knobs or touch controls that do not respond",
      "Constant clicking from the igniters",
    ],
    checks: [
      "Let the cooktop cool, then clean and dry the burner caps and ports",
      "Confirm that burner caps are seated correctly",
      "Try induction-compatible cookware to rule out the pan",
    ],
    commercialIntro:
      "A down burner cuts into kitchen capacity. We repair ignition, burner and control problems on cooking equipment in restaurants and commercial kitchens.",
    commercialProblems: [
      "Burner ports clogged with grease and food debris",
      "Worn igniters and gas valves",
      "Uneven flame during heavy use",
    ],
    repairOrReplace:
      "Igniters, spark modules and switches are usually modest repairs. A cracked glass top or a failed induction board costs more, so we go over the price first.",
  },
  microwave: {
    label: "Microwave",
    lower: "microwave",
    intro:
      "Built-in and over-the-range microwaves are worth repairing more often than countertop models. Microwaves can store dangerous voltage even when unplugged, so internal repairs belong with a technician.",
    problems: [
      "Runs and lights up but does not heat",
      "Sparking or arcing inside the cavity",
      "Keypad or touch panel that does not respond",
      "Turntable that does not rotate",
      "Loud buzzing or humming while running",
      "Door that will not latch, or a unit that keeps stopping",
    ],
    checks: [
      "Stop using it right away if you see sparks or smell burning",
      "Confirm that the door closes firmly and is not damaged",
      "Reset the breaker once if the unit is completely dead",
    ],
    commercialIntro:
      "Commercial microwaves in restaurants and break rooms run many short cycles every day. We diagnose heating, control and door switch problems on heavier-use units.",
    commercialProblems: [
      "Reduced heating power from worn components",
      "Door switches failing from constant use",
      "Keypads damaged by heat, grease and moisture",
    ],
    repairOrReplace:
      "Door switches, turntable motors and keypads are often practical repairs on built-in units. For an inexpensive countertop model, replacement may make more sense, and we will say so.",
  },
  "wine-cooler": {
    label: "Wine Cooler",
    lower: "wine cooler",
    intro:
      "Wine storage depends on steady temperature. We diagnose cooling, fan, control and door seal problems on built-in and freestanding wine coolers.",
    problems: [
      "Temperature will not hold or swings during the day",
      "Unit runs constantly without reaching the setting",
      "Condensation or frost inside the cabinet",
      "Fan noise or vibration that disturbs nearby rooms",
      "Display or interior lights that have failed",
      "Door gasket that no longer seals",
    ],
    checks: [
      "Make sure the front vents and surrounding air gaps are clear",
      "Confirm the door is sealing and racks are not blocking it",
      "Give the unit several hours to stabilize after loading new bottles",
    ],
    commercialIntro:
      "Restaurants, bars and retailers rely on wine coolers to protect inventory and look good on display. We repair cooling and control problems on commercial wine storage units.",
    commercialProblems: [
      "Temperature swings from frequent door openings",
      "Dirty condensers in warm rooms",
      "Failed fans and sensors in display units",
    ],
    repairOrReplace:
      "Fans, sensors, controls and gaskets are commonly repairable. Move valuable bottles somewhere stable if the temperature keeps rising while you wait for service.",
  },
  freezer: {
    label: "Freezer",
    lower: "freezer",
    intro:
      "A freezer that warms up can lose a lot of food quickly. We repair upright, chest and built-in freezers and check cooling, defrost, fan and control components.",
    problems: [
      "Food is softening or will not stay frozen",
      "Heavy frost buildup on the walls or the coils",
      "Unit runs constantly",
      "Water on the floor under the freezer",
      "Clicking, buzzing or loud fan noise",
      "Door that does not close or a gasket that does not seal",
    ],
    checks: [
      "Keep the door closed as much as possible to protect the food",
      "Check that the door is not held open by a package",
      "Clean dust from the condenser and vents if you can reach them",
    ],
    commercialIntro:
      "Commercial freezers protect expensive inventory. We diagnose rising temperatures, defrost faults and door problems on units used by restaurants, stores and other businesses.",
    commercialProblems: [
      "Defrost system failures causing ice buildup",
      "Door gaskets and hinges worn by heavy use",
      "Condensers clogged in hot back-of-house spaces",
    ],
    repairOrReplace:
      "Fans, defrost parts and controls are usually good repairs. A sealed system failure needs a closer look, especially on an older freezer.",
  },
  "garbage-disposal": {
    label: "Garbage Disposal",
    lower: "garbage disposal",
    intro:
      "A jammed, leaking or silent disposal can stop the whole kitchen sink. We diagnose motor, jam, electrical and leak problems and tell you honestly whether repair or replacement is the better choice.",
    problems: [
      "Humming without grinding, usually from a jam",
      "No power at all",
      "Water leaking from the top, side or bottom",
      "Sink drains slowly through the disposal",
      "Loud metallic grinding noises",
      "Persistent odors from the unit",
    ],
    checks: [
      "Turn the power off before looking inside and never put your hand in the unit",
      "Press the reset button on the bottom of the disposal",
      "Use the wrench socket on the bottom to free a jam if your model has one",
    ],
    commercialIntro:
      "Commercial kitchens put disposals under far more load than a household sink. We diagnose jams, motors and leaks on units that have to keep up with busy service.",
    commercialProblems: [
      "Repeated jams from heavy food waste",
      "Motors overheating and tripping",
      "Leaks at mounts and connections",
    ],
    repairOrReplace:
      "Clearing jams and fixing connections are usually simple. A leak from the body of the unit generally means replacement is the better value.",
  },
  stove: {
    label: "Stove",
    lower: "stove",
    intro:
      "When a burner or oven section of your stove stops working, daily cooking gets harder fast. We repair gas and electric stoves, including burners, igniters, switches and oven components.",
    problems: [
      "One or more burners will not heat or light",
      "Burner stays on high or will not adjust",
      "Oven section does not heat correctly",
      "Igniters that keep clicking",
      "Knobs, switches or displays that have failed",
      "Gas smell, which needs immediate attention",
    ],
    checks: [
      "Make sure the unit has power and the breaker has not tripped",
      "Clean spills from burner ports after everything has cooled",
      "If you smell gas, leave the area and call your gas utility",
    ],
    commercialIntro:
      "Commercial stoves work long hours under heavy use. We diagnose burner, ignition, valve and oven problems so kitchens can get equipment back in service.",
    commercialProblems: [
      "Clogged ports reducing flame",
      "Worn valves and igniters",
      "Pilot and safety device faults",
    ],
    repairOrReplace:
      "Elements, igniters and switches are usually worthwhile repairs. We will check the overall condition of the stove before recommending anything larger.",
  },
  range: {
    label: "Range",
    lower: "range",
    intro:
      "A range combines cooktop burners and an oven, so one fault can take away a big part of your kitchen. We diagnose gas, electric and dual-fuel ranges and explain what failed.",
    problems: [
      "Burners will not ignite or heat",
      "Oven heats unevenly or does not reach temperature",
      "Bake or broil functions not working",
      "Control panel errors",
      "Oven door that does not close or seal",
      "Self-clean problems, including a door that stays locked",
    ],
    checks: [
      "Make sure the range is getting power and the breaker is on",
      "Test the oven with a separate thermometer before assuming a calibration issue",
      "If you smell gas, leave the area and contact your gas utility",
    ],
    commercialIntro:
      "A commercial range is often the busiest piece of equipment in the kitchen. We diagnose burners, ovens, valves and ignition problems on ranges in food service locations.",
    commercialProblems: [
      "Uneven flame from clogged ports",
      "Oven temperature drifting during service",
      "Worn valves, knobs and door hardware",
    ],
    repairOrReplace:
      "Igniters, elements, sensors and door parts are commonly repairable. Control boards on premium ranges can cost more, so we explain the options before work starts.",
  },
  "vent-hood": {
    label: "Vent Hood",
    lower: "vent hood",
    intro:
      "A vent hood removes heat, smoke and grease from the cooking area. We diagnose fan, motor, lighting and control problems that keep a hood from working correctly.",
    problems: [
      "Fan does not run or runs weakly",
      "Loud rattling or vibration",
      "Smoke and heat stay in the kitchen",
      "Lights or controls that do not work",
      "Heavy grease buildup on filters",
      "Motor that overheats or shuts off",
    ],
    checks: [
      "Clean or replace the grease filters",
      "Listen for the fan at each speed setting",
      "Confirm that the breaker or switch has not been turned off",
    ],
    commercialIntro:
      "In a commercial kitchen a poor-performing hood makes the whole line hot and smoky. We repair fan, motor and control problems on commercial vent hoods. Fire suppression systems and duct cleaning are handled by specialized contractors.",
    commercialProblems: [
      "Weak exhaust caused by worn motors or belts",
      "Fans vibrating from imbalance or grease buildup",
      "Failed switches and lights in the hood",
    ],
    repairOrReplace:
      "Motors, switches and lights are usually practical repairs. We will tell you if the issue is outside the appliance, such as ductwork that needs a specialist.",
  },
};

export function getApplianceFromSlug(slug: string) {
  const isCommercial = slug.startsWith("commercial-");
  const key = slug.replace(/^commercial-/, "").replace(/-repair$/, "");
  const content = APPLIANCE_CONTENT[key];
  return content ? { key, isCommercial, content } : null;
}

type BrandContent = { focus: string; services: string[] };

export const BRAND_CONTENT: Record<string, BrandContent> = {
  bosch: {
    focus: "Bosch is especially known for quiet dishwashers, and the brand also makes ranges, cooktops, wall ovens and refrigerators.",
    services: ["dishwasher", "range", "oven", "refrigerator"],
  },
  whirlpool: {
    focus: "Whirlpool makes a wide range of household appliances, including refrigerators, washers, dryers, dishwashers and ranges.",
    services: ["refrigerator", "washer", "dryer", "dishwasher"],
  },
  kenmore: {
    focus: "Many households still rely on Kenmore refrigerators, washers, dryers and ranges, which were built under the brand by different manufacturers over the years.",
    services: ["refrigerator", "washer", "dryer", "range"],
  },
  maytag: {
    focus: "Maytag is best known for laundry, and the brand also includes refrigerators, dishwashers and ranges.",
    services: ["washer", "dryer", "dishwasher", "refrigerator"],
  },
  frigidaire: {
    focus: "Frigidaire covers everyday kitchen appliances, including refrigerators, freezers, ranges, dishwashers and microwaves.",
    services: ["refrigerator", "freezer", "range", "dishwasher"],
  },
  electrolux: {
    focus: "Electrolux makes kitchen and laundry appliances, including front-load washers, dryers, ranges and refrigerators.",
    services: ["washer", "dryer", "range", "refrigerator"],
  },
  miele: {
    focus: "Miele is a premium brand known for dishwashers, ovens, cooktops and laundry machines.",
    services: ["dishwasher", "oven", "cooktop", "washer"],
  },
  samsung: {
    focus: "Samsung appliances include feature-rich refrigerators, front-load washers, dryers, ranges and microwaves.",
    services: ["refrigerator", "washer", "dryer", "range"],
  },
  viking: {
    focus: "Viking is known for professional-style ranges, along with cooktops, ovens, ventilation and refrigeration.",
    services: ["range", "oven", "cooktop", "refrigerator"],
  },
  "sub-zero": {
    focus: "Sub-Zero specializes in high-end refrigerators, freezers and wine storage.",
    services: ["refrigerator", "freezer", "wine-cooler"],
  },
  thermador: {
    focus: "Thermador is a luxury brand known for professional ranges, ovens, cooktops, dishwashers and refrigeration.",
    services: ["range", "oven", "cooktop", "dishwasher"],
  },
  wolf: {
    focus: "Wolf focuses on premium cooking equipment, including ranges, ovens, cooktops and microwaves.",
    services: ["range", "oven", "cooktop", "microwave"],
  },
  monogram: {
    focus: "Monogram is the luxury built-in line from GE, including ranges, wall ovens, cooktops, refrigerators and wine storage.",
    services: ["range", "oven", "refrigerator", "wine-cooler"],
  },
};

/** Related residential service for each blog article. */
export const BLOG_SERVICE: Record<string, string> = {
  "why-refrigerator-not-cooling": "refrigerator",
  "dryer-taking-too-long": "dryer",
  "dishwasher-not-cleaning": "dishwasher",
  "washer-vibration-fix": "washer",
  "oven-not-heating-evenly": "oven",
  "ice-machine-low-output": "ice-machine",
};

/** Full articles, used while the stored post is still the short original version. */
export const BLOG_ARTICLES: Record<string, string> = {
  "why-refrigerator-not-cooling": `A warm refrigerator is stressful because the clock starts as soon as the temperature rises. Food safety guidance generally treats 40°F as the upper limit for refrigerated food, so it is worth checking the temperature with an appliance thermometer instead of guessing. Many cooling problems have a simple cause, and a few checks can help you decide what to do next.

## Start with the settings and the door

Thermostat dials and touch panels get bumped more often than people think. Confirm the setting first. Then check that nothing is holding the door open and that the gasket is clean and sealing all the way around. A door left slightly open can make the fridge run constantly and still fall behind.

## Clean the condenser coils

The condenser releases the heat removed from inside the refrigerator. When it is covered in dust and pet hair, the system has to work harder and cooling suffers. Unplug the refrigerator and vacuum the coils if your model gives you access to them. Coils may be behind a lower grille or on the back of the unit.

## Let the cold air move

Most refrigerators send cold air from the freezer into the fresh food section through vents. If those vents are blocked by food containers, one area can warm up while another stays cold. Rearrange the shelves and leave space around the vents.

## When the freezer is cold but the fridge is warm

This pattern often points to an airflow problem. A failed evaporator fan or a coil covered in frost can stop cold air from reaching the fresh food section. Heavy frost on the back wall of the freezer is another sign that the defrost system may need attention. These repairs require disassembly and testing, so this is usually the right time to call a technician.

## When to call for service

Schedule service if the temperature is still too high after these checks, if the compressor is running constantly or clicking on and off, or if you see water collecting inside or under the unit. In the meantime, keep the doors closed as much as possible and move the most sensitive food to a cooler with ice if the temperature keeps rising.`,
  "dryer-taking-too-long": `A dryer that needs two or three cycles is more than an annoyance. It wastes energy, wears out your clothes and can point to restricted airflow, which is also a safety concern. Here are the first things to inspect.

## 1. Clean the lint screen properly

Empty the screen before every load. Fabric softener sheets can leave a thin, nearly invisible film on the mesh, so wash it with warm soapy water now and then and let it dry completely.

## 2. Check the lint trap housing

Lint can collect in the opening below the screen. With the dryer off, use a vacuum hose attachment to remove what you can reach.

## 3. Inspect the vent hose

Pull the dryer out carefully and look at the hose behind it. A crushed or kinked hose restricts airflow and traps moisture. Smooth metal ducting generally allows better airflow than thin flexible hoses.

## 4. Test the outside vent

Start the dryer and go to the exterior vent. You should feel strong, warm air and see the flap open. Weak airflow means the duct may be clogged. Long duct runs in particular can collect a lot of lint and may need professional cleaning.

## 5. Look at the load

Oversized loads tumble poorly and take much longer to dry. Heavy towels and bedding should not be mixed with light clothes. Also make sure the washer is spinning correctly, because clothes that come out dripping give the dryer far more work.

## 6. Check the moisture sensor

Many dryers have metal sensor bars inside the drum. Residue from softener sheets can cause the dryer to stop too early, leaving clothes damp. Wipe the bars with a soft cloth and a little rubbing alcohol.

## When to call for service

If airflow is good and clothes are still not drying, the fault may be a heating element, igniter, thermostat or thermal fuse. Call for service if the dryer has no heat, the cabinet gets very hot, or you notice a burning smell. Stop using the dryer if you smell burning, and if you smell gas, leave the area and call your gas utility.`,
  "dishwasher-not-cleaning": `Opening the dishwasher to cloudy glasses or food-covered plates is frustrating, but the cause is often simple. Work through these checks before you run another cycle.

## Clean the filter

Many modern dishwashers have a removable filter at the bottom of the tub. When it is full of food, dirty water recirculates and poor cleaning follows. Twist it out, rinse it under warm water, and scrub it gently with a soft brush.

## Clear the spray arms

Spray arms have small holes that can clog with food and mineral deposits. Remove the arms if your manual allows it, clear the holes with a toothpick, and make sure each arm spins freely after you reinstall it. Tall items can also block the arms, so give them a spin by hand before you start a cycle.

## Run hot water first

Dishwashers clean better with hot water. Run the kitchen faucet until the water is hot, then start the cycle. This is especially helpful if the dishwasher is far from the water heater.

## Review your detergent and rinse aid

Too much detergent can leave a film, and old detergent may not perform well. Hard water can also leave mineral spots on glassware, so rinse aid and an occasional cleaning cycle can make a noticeable difference.

## Load for water flow

Dishes should face the center and should not nest together. Overlapping bowls and large pans can block spray from reaching other items. Make sure the detergent door has room to open.

## When to call for service

If cleaning does not improve, the cause may be a weak circulation pump, a failed water inlet valve or a heating problem. Call for service if water stays in the tub after the cycle, the dishwasher leaks, the cycle will not finish, or you hear grinding or loud humming.`,
  "washer-vibration-fix": `A little movement is normal when a washer reaches high speed, but loud banging or a machine that walks across the floor needs attention. Excess vibration can damage the washer and the floor around it. Most fixes start with balance and leveling.

## Balance the load

An uneven load is the most common cause. A single heavy item, such as a comforter or a bath mat, can gather on one side of the drum. Stop the cycle, redistribute the laundry, and add a few similar items if needed. Avoid overfilling.

## Level the washer

Place a level on top of the machine, side to side and front to back. Most washers have adjustable front feet, and some have self-adjusting rear feet. Adjust the feet until all four corners are firmly on the floor, then tighten the lock nuts. Rock the machine gently to confirm it does not move.

## Check the floor

A weak or flexing floor can amplify vibration, especially in an upstairs laundry room. Anti-vibration pads can help, but they will not solve a machine that is badly out of level.

## Look for shipping bolts on a new washer

If the washer was recently installed and shakes violently, check that the shipping bolts were removed from the back. Leaving them in place can seriously damage the machine, so stop using it until they are removed.

## Signs of a worn part

If the washer still shakes with balanced loads, the problem may be internal. Worn shock absorbers, suspension rods or springs let the tub move too much. A loud roaring sound that gets louder with spin speed can point to failing tub bearings.

## When to call for service

Call for service if the banging continues with a balanced load, if the washer is level and still moves, or if you hear roaring, grinding or metal contact. Stop using the washer until it has been checked if the tub is hitting the cabinet.`,
  "oven-not-heating-evenly": `Burned edges with an underdone center can ruin a meal, but uneven baking is not always a broken oven. Some of it comes from how the oven is used. These steps can help you narrow down the cause.

## Measure the actual temperature

An inexpensive oven thermometer is the best place to start. Preheat to 350°F, wait 20 minutes, and read the thermometer without opening the door more than needed. Ovens normally cycle above and below the setting, so take a few readings over time.

## Give the oven enough time to preheat

The preheat signal may come on before the walls and racks are fully heated. Waiting a little longer can help, especially before baking.

## Check rack position and pans

The center rack is the safest choice for most baking. Leave space around pans so hot air can move, and avoid crowding multiple sheets at once. Dark pans brown faster than light ones, and foil on a rack or the oven floor can block airflow and cause hot spots.

## Rotate food or try convection

Most ovens have hot spots. Rotating the pan halfway through baking often solves mild unevenness. If your oven has a convection setting, the fan can help distribute the heat, though you may need to lower the temperature or cooking time according to your recipe.

## Inspect the elements

With the oven off and cool, look at the bake and broil elements on an electric model. Blisters, breaks or a section that does not glow can indicate a failed element. On gas ovens, a weak igniter can cause slow heating or a burner that will not stay lit.

## When to call for service

Schedule service if the temperature is far off the setting, if the oven takes unusually long to preheat, if an element looks damaged, or if you see error codes. A faulty temperature sensor, igniter or control can cause these symptoms. If you smell gas, do not use the oven. Leave the area and contact your gas utility.`,
  "ice-machine-low-output": `A slow ice machine is a headache at home and a real problem for a business. Ice production depends on water supply, heat removal and clean components, so start with the simplest explanations.

## Check the water supply

Make sure the supply valve is fully open and that the line is not kinked behind the unit. Low water pressure can lead to small cubes or low production. If the machine has a water filter, check whether it is overdue, because a clogged filter restricts flow.

## Look at the temperature around the unit

Ice machines remove heat, so they produce less in hot rooms. A machine in a warm garage or a hot kitchen can slow down noticeably. Keep the required clearance around it so the condenser can move air.

## Clean the condenser

Dust and grease on the condenser make it harder to shed heat, which slows the freezing cycle. Follow the manual, turn off the power, and clean accessible air-cooled condensers gently. Commercial kitchens usually need to check this more often.

## Remove scale and buildup

Minerals in the water can coat the evaporator and water system. Scale may lead to thin cubes, slow harvests and bad-tasting ice. Use only cleaners approved by the manufacturer and follow the directions in your manual, including discarding ice made during cleaning.

## Check the bin control

If the shutoff arm or bin sensor is stuck or blocked, the machine may think the bin is full. Make sure ice is not resting against the control and that the arm moves freely.

## When to call for service

Call for service if production stays low after cleaning, if the machine runs without harvesting, if water is leaking, or if you hear unusual noises. The cause may be a water valve, pump, sensor or a problem in the refrigeration system. Businesses that rely on ice should schedule service early, before the machine stops completely.`,
};
