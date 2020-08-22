:author: Lukas Turcani


stk-vis
=======

.. figure:: image.png


Welcome to ``stk-vis``!

Before you get started, you might like to watch the demo video


``stk-vis`` is a cross-platform viewer for molecules and molecular
properties, specifically targeting cases where you want to browse
through multiple molecules quickly. Its main strength is allowing
smoother collaboration between multiple people or between multiple
research groups, but it is also a useful tool for individual users.

So how does ``stk-vis`` do this? ``stk-vis`` connects to local
or remote MongoDB molecular databases, which hold the molecules you
would like to view, as well as their properties. If you think
setting up a MongoDB database is a bit of a chore, I promise you that
it is actually trivial, that you don't need to know anything about
databases, and I will show you to build one!

Assuming that you have your database, or someone has provided one
for you, you can connect to it from anywhere. For example, try
downloading the latest release of
``stk-vis`` for your platform here_ and using the following URL::

    mongodb+srv://stk-vis:example@stk-vis-example.x4bkl.mongodb.net

Here is a picture of your connection settings:

.. figure:: example-coonection

This should connect you to a public database I made. Note that you
don't have to change any of the other default values.
(The connection might be a bit slow because I'm using a free server
hosted in Europe, but if you use your own it should be much faster.)
You can also make your databases private and only allow access to
specific users.

.. _here: https://github.com/lukasturcani/stk-vis


To give an example use case, you can have a group of computational
scientists depositing molecules and their properties into the database,
and their  synthetic collaborators can immediately see which molecules
have been added and what their properties are, in order to see if they
would like to make anything. The synthetic group does not need
to worry about databases at all, they just need to download ``stk-vis``
and connect the the URL the computational team provides them with.


However, any time you are dealing with lots of molecules, and lots
of molecular files, its probably a good idea to switch to using a
database, whether you are working as an individual or not. This keeps
all your data easy to access and organized.

Features
========

* 3D interactive molecular rendering.
* 2D molecular projection.
* Tabulation of any molecular properties deposited into the database.
* If you have molecules that were constructed from building block
  molecules, you can see which building blocks were used to make that
  molecule, and then you can see if those building blocks had building
  blocks too! You can keep doing this until you run out of building
  blocks.
* Sort molecules according to property values to quickly find ones
  with the best or worst properties.
* Sometimes 2D projections are expensive to calculate. As a result,
  you can toggle the 2D viewer on or off. You can also toggle the 3D
  viewer, but I suggest you first check if the 2D viewer is the
  cause of performance problems.

Latest Release
==============

You can see the latest release for your platform by clicking on the
following link:


If you would like to get updates when a new version of ``stk-vis``
simply click on the ``watch`` button in the top right corner of the
GitHub page, and if you only care about new releases, select
``Releases only`` from the dropdown menu.


