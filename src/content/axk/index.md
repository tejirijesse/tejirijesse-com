---
name: AXK Network
oneLine: Verification infrastructure for agricultural trade in East Africa
sector: Trade and agriculture
years: 2023–present
status: live
role: Co-founder and CEO
order: 1

indexImage: ./media/axk-cooperative-2026-03.jpg
indexAlt: >-
  PENDING — replace with the real description. A cooperative officer weighing
  sacks at a collection point in Musanze, Rwanda, with the delivery ledger open
  on the table.
indexCaption: Collection point, Musanze, 2024

credits:
  - name: Joseph Rukundo
    did: Co-founder. Field research across four countries; commercial lead
---

## Context

> **TO WRITE — Tejiri.** Where, when, who, in three or four sentences. The
> reader has just clicked a photograph of a collection point and knows nothing
> else. Name the country you started in, the year, and who was in the room.
> A field photograph belongs here, not a diagram.

## Problem

A cooperative can grow a crop it cannot sell, because the paperwork a farmer
cannot produce is worth more to a buyer than the crop they can.

Stated without any technology in it: the constraint on a smallholder's income
is not agronomy and it is not demand. It is that no party in the chain can
establish, to a stranger's satisfaction, where a sack came from and what
happened to it on the way.

## People

Cooperative officers, who keep the records. Traders and exporters, who are
asked to vouch for what they did not see. Compliance officers at European
buyers, who must refuse anything they cannot evidence. And the smallholder,
who is the subject of every record and the author of none of them.

> **TO WRITE — Tejiri.** Named roles and real conversations, per clause 05.
> Who specifically did you sit with? A cooperative chair, a warehouse manager,
> a ministry official. One remembered exchange is worth a paragraph of
> categories.

## Evidence

> **TO WRITE — Tejiri.** What did you actually see or measure that established
> the problem, as distinct from what you were told? The rejected shipment, the
> due-diligence questionnaire with blank fields, the ledger page that did not
> reconcile. Numbers if you have them, and their source.

## What I believed

We believed the problem was access to buyers.

We had spent months across four countries talking to cooperatives, and the
account we heard was consistent: they could grow it, they could not sell it.
European buyers were unreachable, intermediaries took the margin, and the fix
was obviously to remove the intermediary. We were confident. We built a
marketplace on that.

> **TO WRITE — Tejiri.** This is the single most important passage on the site
> and it has to be yours, in the tense you actually believed it. Name the
> months, the four countries, who you spoke to, and what you were sure of. Do
> not signal the reversal here. No "of course", no "at first". The reader
> should be able to agree with you at the end of this section.

## System map

> **ASSET PENDING — clause 16.2.** The hand-drawn map first, the clean one
> second. Specifically: the first architecture, the one that put verification
> at the end of the flow, and the whiteboard or notebook page where
> verification moved to the front. Both dated.

## The design question

> **TO WRITE — Tejiri.** One question, and why that framing rather than the
> ones you rejected. The candidate framings are visible in the history —
> "how do we connect cooperatives to buyers" is the one you started with and
> abandoned. Name at least one other you considered and say why it was worse.

## Experiments

> **TO WRITE — the version sequence.** What was built to learn, as distinct
> from what was built to ship. Write it as a numbered sequence:
>
> 1. **What you built first**, and what you expected it to prove.
> 2. **What you built next**, and what changed your mind between the two.
> 3. **The one that did not work.** Say so in those words. Give the actual
>    signal — the number, the silence, the person who did not come back.
> 4. **What survived**, and why that version and not the others.
>
> For this project that sequence is roughly: the marketplace, whatever came
> after it, and the verification-first build that stuck.

## Where it broke

> **TO WRITE — Tejiri.** The turn. What did a buyer actually say when you
> brought them a cooperative? My understanding is that demand was never the
> constraint — the constraint was that nobody could prove where a sack came
> from, and no amount of introductions fixes an evidentiary problem. Write the
> specific moment you understood that. A conversation, a rejected shipment, a
> due-diligence questionnaire you could not fill in. One scene, not a summary.

## What changed

The system that survived does three things. It writes proof records to a public
ledger so that a claim about origin can be checked by anyone rather than
attested by whoever is most powerful in the transaction. It runs a fine-tuned
model over trade documents for credit assessment, EUDR compliance, and fraud
detection. And it charges by consumption rather than by seat, because the
cooperatives who need it most are the ones least able to sign an annual
contract.

> **ASSET PENDING — rule 05.1.** Two unfinished for every finished. Available
> here: the discarded approach to credit scoring before the fine-tuned model,
> and a screenshot of something visibly broken in a pilot. Every one needs a
> caption that argues rather than labels. Not "AXK architecture v2" but "The
> second architecture. Verification is the box on the left, and moving it there
> is what made every party stop verifying independently."

## Outcome

Five countries. Around 10,000 participants. Roughly $25,000 in revenue as of
March 2026. $250,000 raised, plus about $360,000 in non-dilutive funding from
the Development Bank of Rwanda, Google for Startups, the Lisk EMpower Fund, the
African Union and the Mastercard Foundation.

It is a small business that works. The thesis is not yet proven, and it will not
be until a tier-one counterparty treats one of our records as sufficient
evidence in a transaction they would otherwise have refused.

## Consequences

A verified record is only a protection while it is correct.

If our system says a cooperative's consignment failed a deforestation check and
the system is wrong, we have not merely made an error — we have manufactured an
authoritative one. The buyer will believe the ledger over the farmer, because
that is precisely the property we sold them. And because proof records are
designed to be durable, the mistake outlives the correction.

So the questions I hold open, and have only partly answered in the product:
who can dispute a record, how long that takes, whether the dispute is visible
to the same parties who saw the original claim, and what a cooperative does for
the season it takes to resolve. A verification network without a functioning
appeals path is a credit bureau with better cryptography, and credit bureaus
have a well-documented history in exactly this respect.

> **TO WRITE — Tejiri.** State honestly what the dispute mechanism does today,
> including if the answer is "an email to us". The admission is worth more than
> the safeguard.

## Credits

> **TO WRITE — Tejiri.** Joseph is named in the frontmatter with his
> contribution. Add anyone else: the backend engineer on the settlement layer,
> field researchers, the cooperatives who let you sit in. Clause 17.6 requires
> every collaborator named on every project.

## What I still cannot answer

The record we create becomes the thing a buyer trusts instead of the
cooperative's own word. That is the point, and it is also a transfer of
authority away from the producer and toward us. I do not know how to give that
authority back without giving up the property that makes the record useful in
the first place.
