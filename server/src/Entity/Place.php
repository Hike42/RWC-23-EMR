<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\PlaceRepository;
use DateTimeImmutable;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: PlaceRepository::class)]
#[ApiResource]
class Place
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'places')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Stade $stade = null;

    #[ORM\Column(length: 45)]
    private ?string $type_place = null;

    #[ORM\Column(options: ['default' => 'CURRENT_TIMESTAMP'])]
    private ?\DateTimeImmutable $created_at = null;

    #[ORM\ManyToOne(inversedBy: 'place')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Accreditation $accreditation = null;

    public function __construct()
    {
        $this->created_at = new DateTimeImmutable();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getStade(): ?Stade
    {
        return $this->stade;
    }

    public function setStade(?Stade $stade): static
    {
        $this->stade = $stade;

        return $this;
    }

    public function getTypePlace(): ?string
    {
        return $this->type_place;
    }

    public function setTypePlace(string $type_place): static
    {
        $this->type_place = $type_place;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeInterface
    {
        return $this->created_at;
    }

    public function setCreatedAt(\DateTimeInterface $created_at): static
    {
        $this->created_at = $created_at;

        return $this;
    }

    public function getAccreditation(): ?Accreditation
    {
        return $this->accreditation;
    }

    public function setAccreditation(?Accreditation $accreditation): static
    {
        $this->accreditation = $accreditation;

        return $this;
    }
}
