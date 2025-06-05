import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Wheelchair Basketball | Disability Sports Channel",
  description: "Learn about wheelchair basketball, rules, and how to get involved.",
}

export default function WheelchairBasketballPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Wheelchair Basketball</h1>
      <p className="mb-4">
        Wheelchair basketball is a variant of basketball played by people with varying physical disabilities that
        disqualify them from playing an able-bodied sport. This includes lower limb amputations, paraplegia, and other
        locomotor disabilities.
      </p>
      <h2 className="text-2xl font-semibold mb-2">Rules and Regulations</h2>
      <p className="mb-4">
        Wheelchair basketball is played using the same size court and hoops as able-bodied basketball. Some rules are
        modified to accommodate the wheelchairs.
      </p>
      <ul className="list-disc list-inside mb-4">
        <li>Players must dribble the ball while pushing their wheelchair.</li>
        <li>A player is allowed two pushes on their wheels while holding the ball.</li>
        <li>Otherwise, the rules are very similar to able-bodied basketball.</li>
      </ul>
      <h2 className="text-2xl font-semibold mb-2">Benefits of Playing</h2>
      <p className="mb-4">Wheelchair basketball provides numerous physical and mental health benefits, including:</p>
      <ul className="list-disc list-inside mb-4">
        <li>Improved cardiovascular health</li>
        <li>Increased muscle strength and endurance</li>
        <li>Enhanced coordination and balance</li>
        <li>Opportunities for social interaction and teamwork</li>
        <li>Increased self-esteem and confidence</li>
      </ul>
      <h2 className="text-2xl font-semibold mb-2">Get Involved</h2>
      <p className="mb-4">
        If you are interested in learning more about wheelchair basketball or getting involved, please contact your
        local disability sports organization.
      </p>
    </div>
  )
}
