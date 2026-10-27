import unittest

from support import run_solution


class Stars2MediumTest(unittest.TestCase):
    def test_case_01_gurava(self):
        """Gurava."""
        result = run_solution('stars-2-medium', 'Gurava\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '****** Gurava ******\n')

    def test_case_02_hi(self):
        """Hi."""
        result = run_solution('stars-2-medium', 'Hi\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '** Hi **\n')

    def test_edge_01_empty_line(self):
        """Empty line."""
        result = run_solution('stars-2-medium', '\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '  \n')

    def test_edge_02_name_with_a_space(self):
        """Name with a space."""
        result = run_solution('stars-2-medium', 'K Guravaiah\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '*********** K Guravaiah ***********\n')


if __name__ == "__main__":
    unittest.main()
