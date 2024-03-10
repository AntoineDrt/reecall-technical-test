# Reecall Technical Test

## System Architecture

I chose to write this application using **Clean Architecture**.\
Even though it is overkill for a project this size, it creates a system that is highly:

- maintanable
- scalable
- testable

## Application overview

This social application allows users to share posts anonymously.\
It works like a newsletter where users can register with their email to receive updates and publish anonymous posts that will be sent to all the registered emails.

_⚠️ Disclaimer: I intentionally did not implement any authentication or real emailing system as it was going to add complexity without bringing value regarding the evaluation criterias._

## Use cases

### User subscribes to the newsletter

A user can add its email to the newsletter.
This action will trigger the emailing system, sending them an email to thank them for joining in.
