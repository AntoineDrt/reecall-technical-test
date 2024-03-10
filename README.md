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

An anonymous user adds its email to the newsletter.\
This will trigger the notification system, sending them a welcome email.

_🛜 Emits event : `newSubscribtion`_

### User publishes post

An anonymous user creates a text post.\
This trigger the notification system, sending the post to all the newsletter subscribers.

_🛜 Emits event : `postPublished`_

### System broadcast post

The system sends a mail containing a post to all the newsletter subscribers.

_🛜 Triggered by : [User publishes post](#user-publishes-post) via notification system listening on `postPublished`_

### System welcome subscriber

The system sends a mail welcoming a subscriber.

_🛜 Triggered by : [User subscribes to the newsletter](#user-subscribes-to-the-newsletter) via notification system listening on `newSubscribtion`_
