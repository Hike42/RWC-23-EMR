<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230629095555 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE accreditation (id INT AUTO_INCREMENT NOT NULL, user_id INT NOT NULL, created_at DATETIME NOT NULL, INDEX IDX_3BF9D0D8A76ED395 (user_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE accreditation_status (id INT AUTO_INCREMENT NOT NULL, acreditation_id INT NOT NULL, status VARCHAR(45) NOT NULL, UNIQUE INDEX UNIQ_6A2F9E1EA445CB11 (acreditation_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE channel (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(45) NOT NULL, created_at DATETIME NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE media (id INT AUTO_INCREMENT NOT NULL, name_media VARCHAR(45) NOT NULL, description VARCHAR(255) NOT NULL, created_at DATETIME NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE media_team (id INT AUTO_INCREMENT NOT NULL, user_id INT NOT NULL, role_id INT NOT NULL, created_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', UNIQUE INDEX UNIQ_7A779CCA76ED395 (user_id), INDEX IDX_7A779CCD60322AC (role_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE place (id INT AUTO_INCREMENT NOT NULL, stade_id INT NOT NULL, accreditation_id INT NOT NULL, type_place VARCHAR(45) NOT NULL, created_at DATETIME NOT NULL, INDEX IDX_741D53CD6538AB43 (stade_id), INDEX IDX_741D53CDA0822E24 (accreditation_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE reason_warn (id INT AUTO_INCREMENT NOT NULL, title VARCHAR(255) NOT NULL, description LONGTEXT NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE rencontre (id INT AUTO_INCREMENT NOT NULL, stade_id INT NOT NULL, name VARCHAR(45) NOT NULL, played_at DATETIME NOT NULL, INDEX IDX_460C35ED6538AB43 (stade_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE role (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(45) NOT NULL, hierachy INT NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE stade (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(45) NOT NULL, location VARCHAR(45) NOT NULL, capacity INT NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE user (id INT AUTO_INCREMENT NOT NULL, media_id INT NOT NULL, email VARCHAR(180) NOT NULL, roles LONGTEXT NOT NULL COMMENT \'(DC2Type:json)\', password VARCHAR(255) NOT NULL, UNIQUE INDEX UNIQ_8D93D649E7927C74 (email), INDEX IDX_8D93D649EA9FDD75 (media_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE user_warn (id INT AUTO_INCREMENT NOT NULL, accreditation_id INT NOT NULL, reason_id INT NOT NULL, created_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', INDEX IDX_533BFDCCA0822E24 (accreditation_id), INDEX IDX_533BFDCC59BB1592 (reason_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE accreditation ADD CONSTRAINT FK_3BF9D0D8A76ED395 FOREIGN KEY (user_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE accreditation_status ADD CONSTRAINT FK_6A2F9E1EA445CB11 FOREIGN KEY (acreditation_id) REFERENCES accreditation (id)');
        $this->addSql('ALTER TABLE media_team ADD CONSTRAINT FK_7A779CCA76ED395 FOREIGN KEY (user_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE media_team ADD CONSTRAINT FK_7A779CCD60322AC FOREIGN KEY (role_id) REFERENCES role (id)');
        $this->addSql('ALTER TABLE place ADD CONSTRAINT FK_741D53CD6538AB43 FOREIGN KEY (stade_id) REFERENCES stade (id)');
        $this->addSql('ALTER TABLE place ADD CONSTRAINT FK_741D53CDA0822E24 FOREIGN KEY (accreditation_id) REFERENCES accreditation (id)');
        $this->addSql('ALTER TABLE rencontre ADD CONSTRAINT FK_460C35ED6538AB43 FOREIGN KEY (stade_id) REFERENCES stade (id)');
        $this->addSql('ALTER TABLE user ADD CONSTRAINT FK_8D93D649EA9FDD75 FOREIGN KEY (media_id) REFERENCES media (id)');
        $this->addSql('ALTER TABLE user_warn ADD CONSTRAINT FK_533BFDCCA0822E24 FOREIGN KEY (accreditation_id) REFERENCES accreditation (id)');
        $this->addSql('ALTER TABLE user_warn ADD CONSTRAINT FK_533BFDCC59BB1592 FOREIGN KEY (reason_id) REFERENCES reason_warn (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE accreditation DROP FOREIGN KEY FK_3BF9D0D8A76ED395');
        $this->addSql('ALTER TABLE accreditation_status DROP FOREIGN KEY FK_6A2F9E1EA445CB11');
        $this->addSql('ALTER TABLE media_team DROP FOREIGN KEY FK_7A779CCA76ED395');
        $this->addSql('ALTER TABLE media_team DROP FOREIGN KEY FK_7A779CCD60322AC');
        $this->addSql('ALTER TABLE place DROP FOREIGN KEY FK_741D53CD6538AB43');
        $this->addSql('ALTER TABLE place DROP FOREIGN KEY FK_741D53CDA0822E24');
        $this->addSql('ALTER TABLE rencontre DROP FOREIGN KEY FK_460C35ED6538AB43');
        $this->addSql('ALTER TABLE user DROP FOREIGN KEY FK_8D93D649EA9FDD75');
        $this->addSql('ALTER TABLE user_warn DROP FOREIGN KEY FK_533BFDCCA0822E24');
        $this->addSql('ALTER TABLE user_warn DROP FOREIGN KEY FK_533BFDCC59BB1592');
        $this->addSql('DROP TABLE accreditation');
        $this->addSql('DROP TABLE accreditation_status');
        $this->addSql('DROP TABLE channel');
        $this->addSql('DROP TABLE media');
        $this->addSql('DROP TABLE media_team');
        $this->addSql('DROP TABLE place');
        $this->addSql('DROP TABLE reason_warn');
        $this->addSql('DROP TABLE rencontre');
        $this->addSql('DROP TABLE role');
        $this->addSql('DROP TABLE stade');
        $this->addSql('DROP TABLE user');
        $this->addSql('DROP TABLE user_warn');
    }
}
