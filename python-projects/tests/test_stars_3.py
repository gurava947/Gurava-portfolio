import unittest

from support import run_solution


class Stars3Test(unittest.TestCase):
    def test_case_01_three_stars(self):
        """Three stars."""
        result = run_solution('stars-3', '3')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '* * * \n* * * \n* * * \n')

    def test_case_02_one_star(self):
        """One star."""
        result = run_solution('stars-3', '1')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '* \n* \n* \n')

    def test_edge_01_zero(self):
        """Zero."""
        result = run_solution('stars-3', '0')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '\n\n\n')

    def test_edge_02_negative(self):
        """Negative."""
        result = run_solution('stars-3', '-1')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '\n\n\n')


if __name__ == "__main__":
    unittest.main()
