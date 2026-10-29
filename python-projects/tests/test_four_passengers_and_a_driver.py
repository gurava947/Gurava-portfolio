import unittest

from support import run_solution


class FourPassengersAndADriverTest(unittest.TestCase):
    def test_case_01_twelve_people(self):
        """twelve people."""
        result = run_solution('four-passengers-and-a-driver', '12\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '3\n')

    def test_case_02_exact_fit(self):
        """exact fit."""
        result = run_solution('four-passengers-and-a-driver', '10\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '2\n')

    def test_case_03_one_person(self):
        """one person."""
        result = run_solution('four-passengers-and-a-driver', '1\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '1\n')


if __name__ == "__main__":
    unittest.main()
