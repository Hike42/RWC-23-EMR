<?php

namespace App\DataFixtures;

use App\Entity\Stade;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class StadesFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        $stade = new Stade();

        $manager->flush();
    }
}
