<?php

namespace App\Repository;

use App\Entity\Ancestor;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Ancestor>
 *
 * @method Ancestor|null find($id, $lockMode = null, $lockVersion = null)
 * @method Ancestor|null findOneBy(array $criteria, array $orderBy = null)
 * @method Ancestor[]    findAll()
 * @method Ancestor[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class AncestorRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Ancestor::class);
    }

//    /**
//     * @return Ancestor[] Returns an array of Ancestor objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('a')
//            ->andWhere('a.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('a.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?Ancestor
//    {
//        return $this->createQueryBuilder('a')
//            ->andWhere('a.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
