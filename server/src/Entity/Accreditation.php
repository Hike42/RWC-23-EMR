<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\AccreditationRepository;
use DateTimeImmutable;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: AccreditationRepository::class)]
#[ApiResource]
class Accreditation
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'accreditations')]
    #[ORM\JoinColumn(nullable: false)]
    private ?User $user = null;

    #[ORM\OneToMany(mappedBy: 'accreditation', targetEntity: Place::class, orphanRemoval: true)]
    private Collection $place;

    #[ORM\Column(options: ['default' => 'CURRENT_TIMESTAMP'])]
    private ?\DateTimeImmutable $created_at = null;

    #[ORM\OneToOne(mappedBy: 'acreditation', cascade: ['persist', 'remove'])]
    private ?AccreditationStatus $accreditationStatus = null;

    #[ORM\OneToMany(mappedBy: 'accreditation', targetEntity: UserWarn::class)]
    private Collection $userWarns;

    public function __construct()
    {
        $this->place = new ArrayCollection();
        $this->userWarns = new ArrayCollection();
        $this->created_at = new DateTimeImmutable();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): static
    {
        $this->user = $user;

        return $this;
    }

    /**
     * @return Collection<int, Place>
     */
    public function getPlace(): Collection
    {
        return $this->place;
    }

    public function addPlace(Place $place): static
    {
        if (!$this->place->contains($place)) {
            $this->place->add($place);
            $place->setAccreditation($this);
        }

        return $this;
    }

    public function removePlace(Place $place): static
    {
        if ($this->place->removeElement($place)) {
            // set the owning side to null (unless already changed)
            if ($place->getAccreditation() === $this) {
                $place->setAccreditation(null);
            }
        }

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

    public function getAccreditationStatus(): ?AccreditationStatus
    {
        return $this->accreditationStatus;
    }

    public function setAccreditationStatus(AccreditationStatus $accreditationStatus): static
    {
        // set the owning side of the relation if necessary
        if ($accreditationStatus->getAcreditation() !== $this) {
            $accreditationStatus->setAcreditation($this);
        }

        $this->accreditationStatus = $accreditationStatus;

        return $this;
    }

    /**
     * @return Collection<int, UserWarn>
     */
    public function getUserWarns(): Collection
    {
        return $this->userWarns;
    }

    public function addUserWarn(UserWarn $userWarn): static
    {
        if (!$this->userWarns->contains($userWarn)) {
            $this->userWarns->add($userWarn);
            $userWarn->setAccreditation($this);
        }

        return $this;
    }

    public function removeUserWarn(UserWarn $userWarn): static
    {
        if ($this->userWarns->removeElement($userWarn)) {
            // set the owning side to null (unless already changed)
            if ($userWarn->getAccreditation() === $this) {
                $userWarn->setAccreditation(null);
            }
        }

        return $this;
    }
}
